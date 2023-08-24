import { ServiceResponse } from '@/types';

export function catchServiceError<T>() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any): Promise<ServiceResponse<T>> {
      try {
        return await method.apply(target, args);
      } catch (error) {
        return {
          success: false,
          message: (error as Error).message,
        };
      }
    }
  }
}
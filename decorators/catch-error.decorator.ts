import { RepositoryResponse, ServiceResponse } from '@/types';
import { AxiosError } from 'axios';

export function catchServiceError<T>() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any): Promise<ServiceResponse<T>> {
      try {
        return await method.apply(this, args);
      } catch (error) {
        return {
          success: false,
          message: (error as Error).message,
        };
      }
    }
  }
}

export function catchAxiosError<T>() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any): Promise<RepositoryResponse<any>> {
      try {
        return await method.apply(this, args);
      } catch (error) {
        console.log(error);
        return {
          success: false,
          code: (error as AxiosError).response?.status || 500,
          message: (error as AxiosError).response?.statusText || '',
          stack: (error as Error).stack,
          data: (error as AxiosError).response?.data,
        };
      }
    }
  }
}
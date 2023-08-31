/**
 * Response data structure
 */
interface ResponseData {
  data?: any;
}

/**
 * SuccessResponseData structure
 */
interface SuccessResponseData {
  data: any;
}

/**
 * ErrorResponseData structure
 */
interface ErrorResponseData {
  errors: ErrorData;
}

/**
 * ErrorData type
 */
interface ErrorData {
  title: string;
  detail: string;
}

interface RepositoryResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data?: T | Record<string, any>;
  stack?: any;
}

interface ServiceResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  stack?: any;
}

export type {
  ResponseData,
  SuccessResponseData,
  ErrorResponseData,
  RepositoryResponse,
  ServiceResponse,
};
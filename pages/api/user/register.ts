import type { NextApiRequest, NextApiResponse } from 'next';
import type { ErrorResponseData, SuccessResponseData } from '@/types';
import { HttpStatusCode } from 'axios';
import UserRepository from "@/repositories/user.repository";

/**
 * Register API route
 */
export default async function handler(request: NextApiRequest, response: NextApiResponse<SuccessResponseData|ErrorResponseData>) {
  const requestBody = request.body;
  const requestMethod = request.method;

  if (!isRequestMethodValid(requestMethod)) {
    response
      .status(HttpStatusCode.NotFound)
      .json({
        errors: {
          title: 'Invalid Request',
          detail: 'HTTP method not supported.',
        },
      });
    return;
  }

  const userRepository = new UserRepository();
  const apiResponse = await userRepository.register(requestBody);
  if (!apiResponse.success) {
    const responseData: ErrorResponseData = {
      errors: {
        title: 'User register error.',
        detail: apiResponse.message,
      }
    };
    response
      .status(apiResponse.code)
      .json(responseData);
    return;
  }

  response
    .status(HttpStatusCode.Created)
    .json({ data: 'OK' });
}

/**
 * Checks if the request method is valid for this request
 * @param {string} requestMethod
 * @returns {boolean}
 */
function isRequestMethodValid(requestMethod: string|undefined): boolean {
  return requestMethod === 'POST';
}
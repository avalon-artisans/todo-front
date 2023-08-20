import type { NextApiRequest, NextApiResponse } from 'next';
import type { ErrorResponseData, SuccessResponseData } from '@/types';
import { HttpStatusCode } from 'axios';

/**
 * Register API route
 */
export default function handler(request: NextApiRequest, response: NextApiResponse<SuccessResponseData|ErrorResponseData>) {
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
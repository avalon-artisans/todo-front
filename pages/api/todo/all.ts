import { withIronSessionApiRoute } from 'iron-session/next';
import type { ErrorResponseData, SuccessResponseData } from '@/types';
import { HttpStatusCode } from 'axios';
import TodoRepository from '@/repositories/todo.repository';
import {sessionOptions} from '@/providers/auth/iron-session-config.provider';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { TodoItem } from '@/types/todo';

export default withIronSessionApiRoute(
  handler,
  sessionOptions
);

/**
 * Register API route
 */
async function handler(request: NextApiRequest, response: NextApiResponse<SuccessResponseData|ErrorResponseData>) {
  const requestMethod = request.method;
  const { user } = request.session;

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

  if (!user) {
    return response
      .status(401)
      .json({
        errors: {
          title: 'Unauthorized',
          detail: 'Please login to continue.'
        }
      });
  }

  const todoRepository = new TodoRepository();
  const apiResponse = await todoRepository.fetchAllTodos(user.sessionToken);

  if (!apiResponse.success) {
    return response
      .status(apiResponse.code)
      .json({
        errors: {
          title: 'Failed fetching todo.',
          detail: apiResponse.message,
        },
      });
  }

  const responseData = apiResponse.data as TodoItem[];
  return response
    .status(200)
    .json({
      data: responseData,
    });
}

/**
 * Checks if the request method is valid for this request
 * @param {string} requestMethod
 * @returns {boolean}
 */
function isRequestMethodValid(requestMethod: string|undefined): boolean {
  return requestMethod === 'GET';
}
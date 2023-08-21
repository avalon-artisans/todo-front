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
  const requestBody = request.body;
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

  // response
  //   .status(HttpStatusCode.Ok)
  //   .json({
  //     data: [
  //       {
  //         id: 1,
  //         title: 'Hello, World!',
  //         description: 'Hello!',
  //         due: '2023-06-28T02:17:34+00:00',
  //         isDone: false,
  //       },
  //       {
  //         id: 2,
  //         title: 'Hello, World! (1)',
  //         description: 'Hello!',
  //         due: '2023-06-28T02:17:34+00:00',
  //         isDone: false,
  //       },
  //       {
  //         id: 3,
  //         title: 'Lorem ipsum',
  //         description: 'Hello!',
  //         due: '2023-06-29T02:17:34+00:00',
  //         isDone: false,
  //       },
  //       {
  //         id: 4,
  //         title: 'Do nothing',
  //         description: 'Nothing!!',
  //         due: '2023-06-30T02:17:34+00:00',
  //         isDone: false,
  //       }
  //     ]
  //   });
}

/**
 * Checks if the request method is valid for this request
 * @param {string} requestMethod
 * @returns {boolean}
 */
function isRequestMethodValid(requestMethod: string|undefined): boolean {
  return requestMethod === 'GET';
}
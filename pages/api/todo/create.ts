import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '@/providers/auth/iron-session-config.provider';
import TodoRepository from '@/repositories/todo.repository';
import type { TodoItem } from '@/types/todo';

export default withIronSessionApiRoute(
  handler,
  sessionOptions
);

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const requestBody = request.body;
  const requestMethod = request.method;
  const { user } = request.session;

  if (!isValidPostRequest(requestMethod)) {
    return response
      .status(404)
      .json({
        errors: {
          title: 'Invalid Request',
          detail: 'HTTP method not supported.',
        },
      });
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
  const apiResponse = await todoRepository.create({
    ...requestBody,
    'ACL': {
      'public': {
        read: false,
        write: false,
      },
      [user.objectId]: {
        read: true,
        write: true,
      }
    },
  }, user.sessionToken);

  if (!apiResponse.success) {
    return response
      .status(apiResponse.code)
      .json({
        errors: {
          title: 'Failed creating todo.',
          detail: apiResponse.message,
        },
      });
  }

  const responseData = apiResponse.data as TodoItem;
  return response.status(200).json(responseData);
}

/**
 * Checks if method request is POST
 * @param requestMethod
 */
function isValidPostRequest(requestMethod: string|undefined): boolean {
  if (!requestMethod) {
    return false;
  }

  return requestMethod.toUpperCase() === 'POST';
}
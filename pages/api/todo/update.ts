import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '@/providers/auth/iron-session-config.provider';
import TodoRepository from '@/repositories/todo.repository';
import type { TodoItem } from '@/types/todo';
import { convertDateStringToUtc } from '@/libraries/date.library';

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

  const validationResponse = checkObjectIdInForm(requestBody);
  if (!validationResponse) {
    return response
      .status(400)
      .json({
        errors: {
          title: 'Bad Request',
          detail: 'Object ID is invalid.',
        }
      });
  }

  if (requestBody.due_date && requestBody.due_date.length > 0) {
    requestBody.due_date = convertDateStringToUtc(requestBody.due_date, requestBody.timezone);
  }
  delete requestBody.timezone;

  const { objectId, ...formData } = requestBody;
  const todoRepository = new TodoRepository();
  const apiResponse = await todoRepository.update(objectId, formData, user.sessionToken);
  console.log(apiResponse);

  if (!apiResponse.success) {
    return response
      .status(apiResponse.code)
      .json({
        errors: {
          title: 'Failed updating todo.',
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

/**
 * Checks object id if present in form
 * @param   {Record<string, any>} formData
 * @returns {boolean}
 */
function checkObjectIdInForm(formData: Record<string, any>): boolean {
  return formData.objectId && formData.objectId.length > 0;
}
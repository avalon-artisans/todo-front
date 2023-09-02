import type { NextApiRequest, NextApiResponse } from 'next';
import type { ErrorResponseData, ResponseData } from '@/types';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/providers/auth/iron-session-config.provider';
import AuthRepository from "@/repositories/auth.repository";

/**
 * User login structure
 */
interface UserLoginData {
  name: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  objectId: string;
  sessionToken: string;
  ACL: Record<string, object>;
  timezone: string;
}

/**
 * IronSessionApiRoute
 */
export default withIronSessionApiRoute(
  handler,
  sessionOptions
)

/**
 * Handler for logging in to internal authentication
 * @param request
 * @param response
 */
async function handler(request: NextApiRequest, response: NextApiResponse<UserLoginData|ErrorResponseData>) {
  const requestBody = request.body;
  const requestMethod = request.method;

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

  if (!isValidRequestBody(requestBody)) {
    return response
      .status(400)
      .json({
        errors: {
          title: 'Invalid Request',
          detail: 'Data is invalid.',
        },
      });
  }

  const authRepository = new AuthRepository();
  const apiResponse = await authRepository.loginUser(requestBody);

  if (!apiResponse.success) {
    return response
      .status(401)
      .json({
        errors: {
          title: 'Failed login.',
          detail: apiResponse.message,
        },
      });
  }
  const responseData = apiResponse.data as UserLoginData;
  request.session.user = responseData;
  await request.session.save();
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
 * Checks if the request body is valid
 * @param requestBody
 */
function isValidRequestBody(requestBody: any): boolean {
  return !(!requestBody.username || !requestBody.password);
}
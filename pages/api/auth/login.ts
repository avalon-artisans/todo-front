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
}

/**
 * LoginResponseData structure
 */
interface LoginResponseData extends ResponseData {
  data?: UserLoginData
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
async function handler(request: NextApiRequest, response: NextApiResponse<LoginResponseData|ErrorResponseData>) {
  const requestBody = request.body;
  const requestMethod = request.method;

  if (!isValidPostRequest(requestMethod)) {
    response
      .status(404)
      .json({
        errors: {
          title: 'Invalid Request',
          detail: 'HTTP method not supported.',
        },
      });
    return;
  }

  if (!isValidRequestBody(requestBody)) {
    response
      .status(400)
      .json({
        errors: {
          title: 'Invalid Request',
          detail: 'Data is invalid.',
        },
      });
    return;
  }

  // todo: implement this
  const authRepository = new AuthRepository();
  const apiResponse = await authRepository.loginUser(requestBody);

  if (!apiResponse.success) {
    response
      .status(401)
      .json({
        errors: {
          title: 'Failed login.',
          detail: apiResponse.message,
        },
      });
    return;
  }
  const responseData: LoginResponseData = apiResponse.data as LoginResponseData;
  request.session.user = responseData.data;
  await request.session.save();
  response.status(200).json(responseData);
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
  return !(!requestBody.email || !requestBody.password);
}
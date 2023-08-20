/**
 * Login credentials structure
 */
interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * User session structure
 */
interface UserSession {
  objectId: string;
  name: string;
  email: string;
  sessionToken: string;
  createdAt: string;
  updatedAt: string;
}

export type {
  LoginCredentials,
  UserSession,
};
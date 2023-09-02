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
  ACL: Record<string, object>;
  timezone: string;
}

export type {
  LoginCredentials,
  UserSession,
};
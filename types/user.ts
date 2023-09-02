/**
 * RegisterFormData structure
 */
interface RegisterFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  retypePassword: string;
  timezone: string;
}

export type {
  RegisterFormData
};
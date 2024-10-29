export interface ResponseApi<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  expireIn: number;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}


export interface SignUpResponse {
  token: string;
  user_name: string;
  user_id: string;
  last_name: string;
  email: string;
  confirm_password: string;
  avatar: string;
}

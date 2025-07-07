export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  message: string;
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
}
export type ApiResponseError = {
  success?: false;
  error?: string;
};

export type ApiResponseSuccess<T> = {
  success: true;
  data?: T;
  metadata?: Record<string, unknown>;
};

export type ApiResponse<T> = {
  statusCode: number;
  message: string | string[];
} & (ApiResponseSuccess<T> | ApiResponseError);

export type User = {
  id: string;
  email: string;
  username: string;
  isVerified: boolean;
};

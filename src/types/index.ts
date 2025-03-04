export type ApiResponseError = {
  status: "error";
  errors?: string[];
};

export type ApiResponseSuccess<T> = {
  status: "success";
  data?: T;
  meta?: Record<string, unknown>;
};

export type ApiResponse<T> = {
  statusCode: number;
  message: string;
} & (ApiResponseSuccess<T> | ApiResponseError);

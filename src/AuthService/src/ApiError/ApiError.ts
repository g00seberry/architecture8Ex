import { getApiErrorMessage } from "./getApiErrorMessage";

export class ApiError extends Error {
  status: number;
  errors?: unknown;

  constructor(status: number, message: string, errors?: unknown) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static makeApiErrorData = (message: string, data?: unknown) => ({
    message,
    data,
  });

  static Unauthorised() {
    return new ApiError(401, getApiErrorMessage("User is not authorized"));
  }
  static BadRequest(message: string, errors?: unknown) {
    return new ApiError(400, message, errors);
  }
  static Forbidden(message: string, errors?: unknown) {
    return new ApiError(403, message, errors);
  }
  static ServerError(message: string, errors?: unknown) {
    return new ApiError(500, message, errors);
  }
}

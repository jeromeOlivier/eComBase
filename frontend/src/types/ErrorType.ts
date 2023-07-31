// Hungarian notation used to avoid conflict with standard JS Error Object.
// ErrorType is used to handle platform specific errors.
export type ErrorType = {
  data?: {
    message?: string | unknown;
    status?: number;
  };
  error?: string;
};

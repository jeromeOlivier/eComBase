export type ErrorType = {
  data?: {
    message?: string | unknown;
    status?: number;
  };
  error?: string;
};

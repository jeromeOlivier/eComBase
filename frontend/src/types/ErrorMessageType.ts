export type ErrorMessageType = {
  data?: {
    message?: string | (() => string);
  };
};

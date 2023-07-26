import {
  ExtendedRequest,
  ExtendedResponse,
  ExtendedNextFunction,
} from "../types/global";

type AsyncFunction = (
  req: ExtendedRequest,
  res: ExtendedResponse,
  next: ExtendedNextFunction
) => Promise<any>;

// This is a middleware function that wraps the async function in a try/catch block
const asyncHandler =
  (fn: AsyncFunction) =>
  (req: ExtendedRequest, res: ExtendedResponse, next: ExtendedNextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncHandler;

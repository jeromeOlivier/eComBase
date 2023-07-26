import { UserRequest, UserResponse } from "../types/global";
import { NextFunction } from "express";

type AsyncFunction = (
  req: UserRequest,
  res: UserResponse,
  next: NextFunction
) => Promise<any>;

// This is a middleware function that wraps the async function in a try/catch block
const asyncHandler =
  (fn: AsyncFunction) =>
  (req: UserRequest, res: UserResponse, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncHandler;

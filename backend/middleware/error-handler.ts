import {
  ExtendedNextFunction,
  ExtendedRequest,
  ExtendedResponse,
} from "../types/global";
import { Error } from "mongoose";

const setStatusCode = (res: ExtendedResponse, status: number) =>
  res.statusCode === 200 ? status : res.statusCode;

const isMongooseBadObjectId = (err: Error): boolean => {
  const castError = err.name === "CastError";
  const objectIdError = (err as any).kind === "ObjectId";
  return castError && objectIdError;
};

const isMongooseDuplicateKey = (err: Error): boolean => {
  const mongoError = err.name === "MongoError";
  const duplicateKeyError = (err as any).code === 11000;
  return mongoError && duplicateKeyError;
};

const handleErrors = (
  err: Error,
  res: ExtendedResponse
): { statusCode: number; message: string; stack: string | undefined } => {
  let statusCode = setStatusCode(res, 500);
  let message = err.message;
  if (isMongooseBadObjectId(err)) {
    message = "Resource not found";
    statusCode = setStatusCode(res, 404);
  } else if (isMongooseDuplicateKey(err)) {
    message = "Duplicate field value entered";
    statusCode = setStatusCode(res, 400);
  }
  return { statusCode, message, stack: getStackTrace(err) };
};

const getStackTrace = (err: Error): string | undefined =>
  process.env.NODE_ENV === "production" ? "🥞" : err.stack;

const errorHandler = (
  err: Error,
  req: ExtendedRequest,
  res: ExtendedResponse,
  next: ExtendedNextFunction
): ExtendedResponse | void => {
  if (err) {
    const error = handleErrors(err, res);
    return res.status(error.statusCode).json(error);
  }
  next();
};

export { errorHandler };

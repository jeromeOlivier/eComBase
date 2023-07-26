import { UserDocument } from "../models/user-model";
import * as express from "express";

// TYPESCRIPT VOODOO!!!: This file is used to extend the Request type definition
// of Express to include a user property and a cookies object. This will allow
// us to work with the user property and cookie object in the request object of
// our controllers. MAGIC!!! (if only it worked)

interface UserRequest extends express.Request {
  user: UserDocument;
  cookies: {
    jwt: string;
  };
}

interface UserResponse extends express.Response {
  user: UserDocument;
}

interface UserNextFunction extends express.NextFunction {
  user: UserDocument;
}

export { UserRequest, UserResponse, UserNextFunction };

// NOTES:
// The Request type definition of Express is defined in the
// @types/express-serve-static-core package.
//
// The Request type definition of Express is defined as follows:
// declare namespace Express {
//   interface Request extends http.IncomingMessage, Express.Request {
//     [key: string]: any;
//   }
// }

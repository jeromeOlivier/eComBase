import { UserDocument } from "../models/user-model";
import { Request as ExpressRequest } from "express";

// TYPESCRIPT VOODOO!!!: This file is used to extend the Request type definition
// of Express to include a user property and a cookies object. This will allow
// us to work with the user property and cookie object in the request object of
// our controllers. MAGIC!!!

declare module "express-serve-static-core" {
  export interface Request extends ExpressRequest {
    user?: UserDocument;
    cookies: any;
  }
}

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

import { UserDocument } from "../models/user-model";
import * as express from "express";

// TYPESCRIPT VOODOO!!!: This file is used to extend the Request type definition
// of Express to include a user property and a cookies object. This allows us to
// work with the user property and cookie object in the request object of our
// controllers.

interface ExtendedRequest extends Omit<express.Request, "user"> {
  user?: UserDocument;
  cookies: {
    jwt: string;
  };
}

interface ExtendedResponse extends express.Response {
  user?: UserDocument;
}

interface ExtendedNextFunction extends express.NextFunction {}

export { ExtendedRequest, ExtendedResponse, ExtendedNextFunction };

// In order for this to work, we need to use this in our controllers.
// We also need to import this file in our middleware/error-handler.ts file.

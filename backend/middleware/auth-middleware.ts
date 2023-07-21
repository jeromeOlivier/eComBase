import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel, UserDocument } from "../models/user-model";
import { NextFunction } from "express";
import asyncHandler from "./async-handler";
import { UserRequest, UserResponse } from "../types/global";

// GENERAL: This middleware will be used to protect routes that require
// authentication. It will check if the request contains a valid token in the
// cookie. If the token is valid, the request will be allowed to continue
// Otherwise, the request will be rejected with a 401 status code

// The protect middleware function is used to protect routes that require
// authentication. It takes RequestWithUserAndCookies for its request parameter.
// RequestWithUserAndCookies is used to get the jwt token from the incoming
// request cookies and to set the user information in the req.user object once
// the JWT token is verified and the user identity has been established.
const protect = asyncHandler(
  async (req: UserRequest, res: UserResponse, next: NextFunction) => {
    let token: string | undefined;

    // Read JWT from the cookie
    token = req.cookies.jwt;

    if (token) {
      try {
        // Verify token
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as JwtPayload;

        // After finding the user associated with the JWT token, the middleware
        // places that user on the req.user property. If the token is not present
        // or invalid, the middleware function throws an error. If everything is
        // valid, it calls next() to pass control to the next middleware or route
        // handler.
        req.user = (await UserModel.findById(decoded.id).select(
          "-password"
        )) as UserDocument;
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Unauthorized");
      }
    } else {
      res.status(401);
      throw new Error("Unauthorized");
    }
  }
);

// ADMIN: The admin middleware function is used to protect routes that require
// authentication and authorization.
const admin = (req: UserRequest, res: UserResponse, next: NextFunction) => {
  // If the user is logged in and is an admin, the middleware will call next()
  // to pass control to the next middleware or route handler. Otherwise, the
  // middleware will throw an error.
  if (req.user?.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Unauthorized");
  }
};

export { protect, admin };

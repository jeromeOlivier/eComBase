import { Response } from "express-serve-static-core";
import jwt from "jsonwebtoken";

const generateToken = (res: Response, userId: string) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
    expiresIn: "30d", // TODO: set to 1d for production
  });
  // Set JWT as HTTP-Only cookie in the response
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30d TODO: set to 1d for production (days * hours * minutes * seconds * milliseconds)
  });
};

export default generateToken;

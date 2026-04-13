import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "./AppError";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      userRole?: string;
    }
  }
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(new AppError("Token is required", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
      role: string;
    };
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return next(new AppError("Token expired, please refresh", 401));
    }
    return next(new AppError("Invalid token", 401));
  }
};

export default authenticate;

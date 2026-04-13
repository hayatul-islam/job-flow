import { NextFunction, Request } from "express";
import AppError from "./AppError";

const validate = (schema: any) => {
  return (req: Request, res: any, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error?.issues?.[0]?.message || "Validation failed";
      return next(new AppError(message, 400));
    }

    req.body = result.data;
    next();
  };
};

export default validate;

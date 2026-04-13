import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error?.issues?.[0]?.message || "Validation failed";
      return next({ status: 400, message });
    }

    req.body = result.data;
    next();
  };
};

export default validate;

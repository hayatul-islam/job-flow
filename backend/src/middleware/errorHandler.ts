import { NextFunction, Request } from "express";

const errorHandler = (err: any, req: Request, res: any, next: NextFunction) => {
  console.error(err.message);

  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.respond(status, false, message);
};

export default errorHandler;

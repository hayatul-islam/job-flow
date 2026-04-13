import { NextFunction, Request } from "express";

const responseHandler = (req: Request, res: any, next: NextFunction) => {
  res.respond = (
    status: number,
    success: boolean,
    message: string,
    data: any = null,
  ) => {
    res.status(status).json({
      status,
      success,
      message,
      data,
    });
  };
  next();
};

export default responseHandler;

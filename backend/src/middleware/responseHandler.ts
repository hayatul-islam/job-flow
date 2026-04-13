import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Response {
      respond: (
        status: number,
        success: boolean,
        message: string,
        data?: any,
      ) => void;
    }
  }
}

const responseHandler = (req: Request, res: Response, next: NextFunction) => {
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

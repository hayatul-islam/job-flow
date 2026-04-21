import { NextFunction, Request } from "express";

const responseHandler = (req: Request, res: any, next: NextFunction) => {
  res.respond = (
    status: number,
    success: boolean,
    message: string,
    data: any = null,
    pagination?: any,
  ) => {
    const response: any = {
      status,
      success,
      message,
      data,
    };

    if (pagination) {
      response.pagination = pagination;
    }

    res.status(status).json(response);
  };
  next();
};

export default responseHandler;

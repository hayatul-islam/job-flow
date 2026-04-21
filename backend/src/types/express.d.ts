declare global {
  namespace Express {
    interface Request {
      userId?: number;
      userRole?: string;
    }
    interface Response {
      respond: (
        status: number,
        success: boolean,
        message: string,
        data?: any,
        pagination?: any,
      ) => void;
    }
  }
}

export {};

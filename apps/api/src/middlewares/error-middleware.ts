
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/http.error";

const errorMiddleware = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const serverStatus = err.serverStatus || 500;

  const message = err.message || "Something went wrong";

  res.status(serverStatus).send({
    status:false,
    message,
    code:serverStatus
  });
};

export default errorMiddleware;
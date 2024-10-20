import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../constants/httpStatusCode";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const success = err.success || false;
  let statusCode = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something went wrong";

  if (err.name == "SequelizeUniqueConstraintError") {
    statusCode = 400;
    message = err.errors[0].message;
  }

  res.status(statusCode).json({
    success,
    message,
  });
};

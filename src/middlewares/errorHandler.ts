import { NextFunction, Request, Response } from 'express';
import CustomError from '../interfaces/CustomError';
import StatusCodes from '../interfaces/StatusCodes';

const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log(err.message);
  if (!err.statusCode) {
    return res.status(StatusCodes.SERVER_ERROR).json({
      message: 'Server error.',
    });
  }
  const { message, statusCode } = err;
  return res.status(statusCode).json({ error: message });
};

export default errorHandler;
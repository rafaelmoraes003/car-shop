import StatusCodes from './StatusCodes';

class CustomError extends Error {
  constructor(
    public message: string, 
    public statusCode: StatusCodes,
  ) {
    super(message);
  }
}

export default CustomError;
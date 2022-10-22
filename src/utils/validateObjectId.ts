import { isValidObjectId } from 'mongoose';
import CustomError from '../interfaces/CustomError';
import StatusCodes from '../interfaces/StatusCodes';

const validateObjectId = (_id: string): void => {
  if (!isValidObjectId(_id)) {
    throw new CustomError(
      'Id must have 24 hexadecimal characters',
      StatusCodes.BAD_REQUEST,
    );
  }
};

export default validateObjectId;
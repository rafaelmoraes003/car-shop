import { isValidObjectId } from 'mongoose';
import CustomError from '../interfaces/CustomError';
import StatusCodes from '../interfaces/StatusCodes';

const validateObjectId = (_id: string): void => {
  if (_id.length < 24) {
    throw new CustomError(
      'Id must have 24 hexadecimal characters',
      StatusCodes.BAD_REQUEST,
    );
  }

  if (!isValidObjectId(_id)) {
    throw new CustomError(
      'Object not found',
      StatusCodes.NOT_FOUND,
    );
  }
};

export default validateObjectId;
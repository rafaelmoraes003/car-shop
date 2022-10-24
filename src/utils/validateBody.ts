import { z } from 'zod';
import CustomError from '../interfaces/CustomError';
import StatusCodes from '../interfaces/StatusCodes';

const validateBody = (
  obj: unknown, 
  schema: z.ZodObject<z.ZodRawShape>,
  mainSchema: z.ZodObject<z.ZodRawShape>,
): void => {
  const zodSchemas = mainSchema.merge(schema);
  const parsedObj = zodSchemas.safeParse(obj);
  let errorMessage;

  if (!parsedObj.success) {
    errorMessage = parsedObj.error.issues[0].message;
    throw new CustomError(
      errorMessage,
      StatusCodes.BAD_REQUEST,
    );
  }
};

export default validateBody;
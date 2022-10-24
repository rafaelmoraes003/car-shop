import { z } from 'zod';
import CustomError from '../interfaces/CustomError';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';
import { zodVehicleSchema } from '../interfaces/IVehicle';
import StatusCodes from '../interfaces/StatusCodes';
import validateBody from '../utils/validateBody';
import validateObjectId from '../utils/validateObjectId';

const objectNotFoundMessage = 'Object not found';

abstract class APIService<T> implements IService<T> {
  private _model: IModel<T>;
  private _zodSchema: z.ZodObject<z.ZodRawShape>;

  constructor(model: IModel<T>, zodSchema: z.ZodObject<z.ZodRawShape>) {
    this._model = model;
    this._zodSchema = zodSchema; 
  }

  public async create(obj: T) {
    validateBody(obj, this._zodSchema, zodVehicleSchema);
    const createdDocument = await this._model.create(obj);
    return { code: StatusCodes.CREATED, data: createdDocument };
  }

  public async read() {
    const documents = await this._model.read();
    return { code: StatusCodes.OK, data: documents };
  }

  public async readOne(_id: string) {
    validateObjectId(_id);
    const document = await this._model.readOne(_id);
    if (!document) throw new CustomError(objectNotFoundMessage, StatusCodes.NOT_FOUND);
    return { code: StatusCodes.OK, data: document };
  }

  public async update(_id: string, obj: T) {
    validateBody(obj, this._zodSchema, zodVehicleSchema);
    validateObjectId(_id);
    const updatedDocument = await this._model.update(_id, obj);
    if (!updatedDocument) throw new CustomError(objectNotFoundMessage, StatusCodes.NOT_FOUND);
    return { code: 200, data: { _id, ...obj } };
  }

  public async delete(_id: string) {
    validateObjectId(_id);
    const deletedDocument = await this._model.delete(_id);
    if (!deletedDocument) throw new CustomError(objectNotFoundMessage, StatusCodes.NOT_FOUND);
    return { code: StatusCodes.SUCCESS_NO_CONTENT };
  }
}

export default APIService;
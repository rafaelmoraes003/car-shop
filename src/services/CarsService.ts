import CustomError from '../interfaces/CustomError';
import { ICar, zodCarSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';
import { zodVehicleSchema } from '../interfaces/IVehicle';
import StatusCodes from '../interfaces/StatusCodes';
import validateBody from '../utils/validateBody';
import validateObjectId from '../utils/validateObjectId';

const objectNotFoundMessage = 'Object not found';

class CarsService implements IService<ICar> {
  private _carModel: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._carModel = model;
  }

  public async create(obj: ICar) {
    validateBody(obj, zodCarSchema, zodVehicleSchema);
    const createdCar = await this._carModel.create(obj);
    return { code: StatusCodes.CREATED, data: createdCar };
  }

  public async read() {
    const cars = await this._carModel.read();
    return { code: StatusCodes.OK, data: cars };
  }

  public async readOne(_id: string) {
    validateObjectId(_id);
    const car = await this._carModel.readOne(_id);
    if (!car) throw new CustomError(objectNotFoundMessage, StatusCodes.NOT_FOUND);
    return { code: StatusCodes.OK, data: car };
  }

  public async update(_id: string, obj: ICar) {
    validateBody(obj, zodCarSchema, zodVehicleSchema);
    validateObjectId(_id);
    const updatedCar = await this._carModel.update(_id, obj);
    if (!updatedCar) throw new CustomError(objectNotFoundMessage, StatusCodes.NOT_FOUND);
    return { code: 200, data: { _id, ...obj } };
  }

  public async delete(_id: string) {
    validateObjectId(_id);
    const deletedCar = await this._carModel.delete(_id);
    if (!deletedCar) throw new CustomError(objectNotFoundMessage, StatusCodes.NOT_FOUND);
    return { code: StatusCodes.SUCCESS_NO_CONTENT };
  }
}

export default CarsService;
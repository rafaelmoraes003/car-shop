import CustomError from '../interfaces/CustomError';
import { ICar, zodCarSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';
import { zodVehicleSchema } from '../interfaces/IVehicle';
import StatusCodes from '../interfaces/StatusCodes';
import validateBody from '../utils/validateBody';
import validateObjectId from '../utils/validateObjectId';

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
    if (!car) throw new CustomError('Object not found', StatusCodes.NOT_FOUND);
    return { code: StatusCodes.OK, data: car };
  }
}

export default CarsService;
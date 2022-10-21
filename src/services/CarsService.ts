import { ICar, zodCarSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';
import { zodVehicleSchema } from '../interfaces/IVehicle';
import StatusCodes from '../interfaces/StatusCodes';
import validateBody from '../utils/validateBody';

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
}

export default CarsService;
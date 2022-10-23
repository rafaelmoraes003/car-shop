import { IModel } from '../interfaces/IModel';
import { IMotorcycle, zodMotorcycleSchema } from '../interfaces/IMotorcycle';
import APIService from './APIService';

class MotorcyclesService extends APIService<IMotorcycle> {
  constructor(model: IModel<IMotorcycle>, schema = zodMotorcycleSchema) {
    super(model, schema);
  }
}

export default MotorcyclesService;
import { IMotorcycle, zodMotorcycleSchema } from '../interfaces/IMotorcycle';
import DatabaseModel from '../models/DatabaseModel';
import APIService from './APIService';

class MotorcyclesService extends APIService<IMotorcycle> {
  constructor(model: DatabaseModel<IMotorcycle>, schema = zodMotorcycleSchema) {
    super(model, schema);
  }
}

export default MotorcyclesService;
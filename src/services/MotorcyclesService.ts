import { IMotorcycle, zodMotorcycleSchema } from '../interfaces/IMotorcycle';
import MotorcyclesModel from '../models/MotorcyclesModel';
import APIService from './APIService';

const motorcyclesModel = new MotorcyclesModel();

class MotorcyclesService extends APIService<IMotorcycle> {
  constructor(model = motorcyclesModel, schema = zodMotorcycleSchema) {
    super(model, schema);
  }
}

export default MotorcyclesService;
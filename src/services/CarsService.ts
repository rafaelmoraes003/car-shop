import { ICar, zodCarSchema } from '../interfaces/ICar';
import CarsModel from '../models/CarsModel';
import APIService from './APIService';

const carsModel = new CarsModel();

class CarsService extends APIService<ICar> {
  constructor(model = carsModel, schema = zodCarSchema) {
    super(model, schema);
  }
} 

export default CarsService;
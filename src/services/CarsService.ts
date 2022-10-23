import { ICar, zodCarSchema } from '../interfaces/ICar';
import DatabaseModel from '../models/DatabaseModel';
import APIService from './APIService';

class CarsService extends APIService<ICar> {
  constructor(model: DatabaseModel<ICar>, schema = zodCarSchema) {
    super(model, schema);
  }
} 

export default CarsService;
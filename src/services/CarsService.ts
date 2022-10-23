import { ICar, zodCarSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import APIService from './APIService';

class CarsService extends APIService<ICar> {
  constructor(model: IModel<ICar>, schema = zodCarSchema) {
    super(model, schema);
  }
} 

export default CarsService;
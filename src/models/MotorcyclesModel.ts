import { Schema, model as mongooseCreateModel } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import DatabaseModel from './DatabaseModel';

const mongooseMotorcycleSchema = new Schema<IMotorcycle>({
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: false,
  },
  buyValue: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true, 
  },
  engineCapacity: {
    type: Number,
    required: true,
  },
}, {
  versionKey: false,
});

class MotorcyclesModel extends DatabaseModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('Motorcycles', mongooseMotorcycleSchema)) {
    super(model);
  }
}

export default MotorcyclesModel;
import { Router } from 'express';
import CarsController from '../controllers/CarsController';
import CarsModel from '../models/CarsModel';
import CarsService from '../services/CarsService';

const cars = Router();

const carsModel = new CarsModel();
const carsService = new CarsService(carsModel);
const carsController = new CarsController(carsService);

cars.post('/', carsController.create);
cars.get('/', carsController.read);
cars.get('/:id', carsController.readOne);
cars.put('/:id', carsController.update);
cars.delete('/:id', carsController.delete);

export default cars;
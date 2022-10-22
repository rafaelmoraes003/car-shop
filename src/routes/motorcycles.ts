import { Router } from 'express';
import MotorcyclesController from '../controllers/MotorcyclesController';
import MotorcyclesService from '../services/MotorcyclesService';

const motorcycles = Router();
const motorcyclesService = new MotorcyclesService();
const motorcyclesController = new MotorcyclesController(motorcyclesService);

motorcycles.post('/', motorcyclesController.create);

export default motorcycles;
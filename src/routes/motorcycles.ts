import { Router } from 'express';
import MotorcyclesController from '../controllers/MotorcyclesController';
import MotorcyclesService from '../services/MotorcyclesService';

const motorcycles = Router();
const motorcyclesService = new MotorcyclesService();
const motorcyclesController = new MotorcyclesController(motorcyclesService);

motorcycles.post('/', motorcyclesController.create);
motorcycles.get('/', motorcyclesController.read);
motorcycles.get('/:id', motorcyclesController.readOne);
motorcycles.put('/:id', motorcyclesController.update);
motorcycles.delete('/:id', motorcyclesController.delete);

export default motorcycles;
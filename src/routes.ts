import { Router } from 'express';
import 'express-async-errors';

import CarController from './controllers/Car';
import CarModel from './models/Car';
import CarService from './services/Car';
import MotorcycleController from './controllers/Motorcycle';
import MotorcycleModel from './models/Motorcycle';
import MotorcycleService from './services/Motorcycle';

const routes = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);
const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

routes.post('/cars', carController.create);
routes.get('/cars', carController.getAll);
routes.get('/cars/:id', carController.getById);
routes.put('/cars/:id', carController.update);
routes.delete('/cars/:id', carController.destroy);

const MOTORCYCLE_ID_ROUTE = '/motorcycles/:id';

routes.post('/motorcycles', motorcycleController.create);
routes.get('/motorcycles', motorcycleController.getAll);
routes.get(MOTORCYCLE_ID_ROUTE, motorcycleController.getById);
routes.put(MOTORCYCLE_ID_ROUTE, motorcycleController.update);
routes.delete(MOTORCYCLE_ID_ROUTE, motorcycleController.destroy);

export default routes;

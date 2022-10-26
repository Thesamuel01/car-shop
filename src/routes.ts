import { Router } from 'express';
import 'express-async-errors';

import CarController from './controllers/Car';
import CarModel from './models/Car';
import CarService from './services/Car';

const routes = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

routes.post('/cars', carController.create);
routes.get('/cars', carController.getAll);

export default routes;

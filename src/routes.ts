import { Router } from 'express';
import 'express-async-errors';

import CarController from './controllers/CarController';
import CarModel from './models/Car';
import CarService from './services/CarService';

const routes = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

routes.post('/cars', carController.create);

export default routes;

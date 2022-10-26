import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

export default class CarController {
  constructor(private _service: IService<ICar>) {}

  public create = async (req: Request, res: Response<ICar>) => {
    const { model, year, color, status, buyValue, doorsQty, seatsQty } = req.body;
    const car = { model, year, color, status, buyValue, doorsQty, seatsQty };
    const result = await this._service.create(car);

    return res.status(201).json(result);
  };

  public getAll = async (req: Request, res: Response<ICar[]>) => {
    const result = await this._service.read();

    return res.status(200).json(result);
  };

  public getById = async (req: Request, res: Response<ICar>) => {
    const { id } = req.params;
    const result = await this._service.readOne(id);

    return res.status(200).json(result);
  };
}

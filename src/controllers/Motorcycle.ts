import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) {}

  public create = async (req: Request, res: Response<IMotorcycle>) => {
    const { model, year, color, status, buyValue, category, engineCapacity } = req.body;
    const motorcycle = { model, year, color, status, buyValue, category, engineCapacity };
    const result = await this._service.create(motorcycle);

    return res.status(201).json(result);
  };

  public getAll = async (req: Request, res: Response<IMotorcycle[]>) => {
    const result = await this._service.read();

    return res.status(200).json(result);
  };

  public getById = async (req: Request, res: Response<IMotorcycle>) => {
    const { id } = req.params;
    const result = await this._service.readOne(id);

    return res.status(200).json(result);
  };

  public update = async (req: Request, res: Response<IMotorcycle>) => {
    const { id } = req.params;
    const { model, year, color, status, buyValue, category, engineCapacity } = req.body;
    const dataUpdate = { model, year, color, status, buyValue, category, engineCapacity };
    const result = await this._service.update(id, dataUpdate);
    
    return res.status(200).json(result);
  };

  public destroy = async (req: Request, res: Response<IMotorcycle>) => {
    const { id } = req.params;
    await this._service.delete(id);
    
    return res.status(204).send();
  };
}

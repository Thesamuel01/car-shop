import { ErrorTypes } from '../errors/catalog';
import { IMotorcycle, MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

export default class MotorcycleService implements IService<IMotorcycle> {
  constructor(private _motorcycle: IModel<IMotorcycle>) {}

  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    return this._motorcycle.create(parsed.data);
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._motorcycle.read();
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    const car = await this._motorcycle.readOne(_id);

    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    return car;
  }

  public async update(_id: string, obj: unknown): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const carUpdated = await this._motorcycle.update(_id, parsed.data);

    if (!carUpdated) throw new Error(ErrorTypes.EntityNotFound);

    return carUpdated;
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    const carUpdated = await this._motorcycle.delete(_id);

    if (!carUpdated) throw new Error(ErrorTypes.EntityNotFound);

    return carUpdated;
  }
}

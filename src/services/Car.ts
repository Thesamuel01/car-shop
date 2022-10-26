import { ErrorTypes } from '../errors/catalog';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

export default class CarService implements IService<ICar> {
  constructor(private _car: IModel<ICar>) {}

  public async create(obj: unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    return this._car.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    return this._car.read();
  }

  public async readOne(_id: string): Promise<ICar> {
    const car = await this._car.readOne(_id);

    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    return car;
  }

  public async update(_id: string, obj: unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const carUpdated = await this._car.update(_id, parsed.data);

    if (!carUpdated) throw new Error(ErrorTypes.EntityNotFound);

    return carUpdated;
  }

  public async delete(_id: string): Promise<ICar> {
    const carUpdated = await this._car.delete(_id);

    if (!carUpdated) throw new Error(ErrorTypes.EntityNotFound);

    return carUpdated;
  }
}

import * as sinon from 'sinon';

import { ICar } from "../../interfaces/ICar";
import { IService } from "../../interfaces/IService";
import { carMockWithId, carsMock, carUpdatedMock } from '../mocks/carMocks';

export default class CarServiceFake implements IService<ICar> {
  async create(obj: unknown): Promise<ICar> {
    return carMockWithId;
  }

  async readOne(_id: string): Promise<ICar> {
    return carMockWithId;
  }
  async read(): Promise<ICar[]> {
    return carsMock;
  }
  async update(_id: string, obj: unknown): Promise<ICar> {
    return carUpdatedMock;
  }
  async delete(_id: string): Promise<ICar> {
    return carMockWithId;
  }
}

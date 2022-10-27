import * as sinon from 'sinon';

import { IMotorcycle } from '../../interfaces/IMotorcycle';
import { IService } from "../../interfaces/IService";
import { motorcycleMockWithId, motorcyclesMock, motorcycleUpdatedMock } from '../mocks/motorcycleMocks';

export default class CarServiceFake implements IService<IMotorcycle> {
  async create(obj: unknown): Promise<IMotorcycle> {
    return motorcycleMockWithId;
  }

  async readOne(_id: string): Promise<IMotorcycle> {
    return motorcycleMockWithId;
  }
  async read(): Promise<IMotorcycle[]> {
    return motorcyclesMock;
  }
  async update(_id: string, obj: unknown): Promise<IMotorcycle> {
    return motorcycleUpdatedMock;
  }
  async delete(_id: string): Promise<IMotorcycle> {
    return motorcycleMockWithId;
  }
}

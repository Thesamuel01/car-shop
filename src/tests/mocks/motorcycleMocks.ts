import { IMotorcycle } from "../../interfaces/IMotorcycle";

export const motorcycleMock: IMotorcycle = {
  model: 'Honda CG Titan 125',
  year: 1963,
  color: 'preto',
  buyValue: 3500,
  category: 'Street',
  engineCapacity: 125,
};

export const motorcycleMockWithId: IMotorcycle & { _id:string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Honda CG Titan 125',
  year: 1963,
  color: 'preto',
  buyValue: 3500,
  category: 'Street',
  engineCapacity: 125,
};

export const motorcyclesMock: IMotorcycle[] = [
  { ...motorcycleMockWithId },
  { 
    _id: '78cf1fc6498565d94lia52cd',
    model: 'Gol',
    year: 1966,
    color: 'cinza',
    buyValue: 4000,
    category: 'Custom',
    engineCapacity: 125,
  }
]

export const motorcycleUpdateDataMock: IMotorcycle = {
  model: 'Honda CG Titan 125',
  year: 2008,
  color: 'branco',
  buyValue: 3500,
  category: 'Street',
  engineCapacity: 125,
};

export const motorcycleUpdatedMock: IMotorcycle & { _id:string } = {
  _id: '62cf1fc6498565d94eba52cd',
  ...motorcycleUpdateDataMock
};
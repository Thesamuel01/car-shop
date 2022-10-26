import { ICar } from "../../interfaces/ICar";

export const carMock: ICar = {
  model: 'Corsa',
  year: 2012,
  color: 'preto',
  buyValue: 15000,
  seatsQty: 4,
  doorsQty: 2,
};

export const carMockWithId: ICar & { _id:string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Corsa',
  year: 2012,
  color: 'preto',
  buyValue: 15000,
  seatsQty: 4,
  doorsQty: 2,
};

export const carsMock: ICar[] = [
  { ...carMockWithId },
  { 
    _id: '78cf1fc6498565d94lia52cd',
    model: 'Gol',
    year: 2009,
    color: 'cinza',
    buyValue: 25000,
    seatsQty: 4,
    doorsQty: 2,
  }
]

export const carUpdateDataMock: ICar = {
  model: 'Corsa',
  year: 2008,
  color: 'branco',
  buyValue: 15000,
  seatsQty: 4,
  doorsQty: 4,
};

export const carUpdatedMock: ICar & { _id:string } = {
  _id: '62cf1fc6498565d94eba52cd',
  ...carUpdateDataMock
};
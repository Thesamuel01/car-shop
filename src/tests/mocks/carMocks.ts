import { ICar } from "../../interfaces/ICar";

export const carMock: ICar = {
  model: 'Corsa',
  year: 2012,
  color: 'preto',
  buyValue: 15000,
  seatsQty: 4,
  doorsQty: 2,
}

export const carMockWithId: ICar & { _id:string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Corsa',
  year: 2012,
  color: 'preto',
  buyValue: 15000,
  seatsQty: 4,
  doorsQty: 2,
};

export const carUpdateDataMock: ICar = {
  model: 'Corsa',
  year: 2008,
  color: 'branco',
  buyValue: 15000,
  seatsQty: 4,
  doorsQty: 4,
}

export const carUpdatedMock: ICar & { _id:string } = {
  _id: '62cf1fc6498565d94eba52cd',
  ...carUpdateDataMock
}
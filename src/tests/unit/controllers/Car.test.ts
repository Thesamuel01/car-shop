import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';

import { carMock, carMockWithId } from '../../mocks/carMocks';
import { ZodError } from 'zod';
import CarServiceFake from '../../helpers/CarServiceFake';
import CarController from '../../../controllers/Car';

const { expect } = chai;

describe('Car Controller', () => {
  const res = {} as Response;
  const req = {} as Request;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  });

  describe('create', () => {
    const carService = new CarServiceFake();
    const carController = new CarController(carService);

    it('Success', async () => {
      req.body = carMock;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });
});
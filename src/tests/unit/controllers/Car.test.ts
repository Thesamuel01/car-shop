import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';

import { carMock, carMockWithId, carsMock, carUpdateDataMock, carUpdatedMock } from '../../mocks/carMocks';
import CarServiceFake from '../../helpers/CarServiceFake';
import CarController from '../../../controllers/Car';

const { expect } = chai;

describe('Car Controller', () => {
  const res = {} as Response;
  const req = {} as Request;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);
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

  describe('getAll', () => {
    const carService = new CarServiceFake();
    const carController = new CarController(carService);

    it('Success', async () => {
      await carController.getAll(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMock)).to.be.true;
    });
  });

  describe('getById', () => {
    const carService = new CarServiceFake();
    const carController = new CarController(carService);

    it('Success', async () => {
      req.params = { id: carMockWithId._id };
      await carController.getAll(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMock)).to.be.true;
    });
  });

  describe('update', () => {
    const carService = new CarServiceFake();
    const carController = new CarController(carService);

    it('Success', async () => {
      req.params = { id: carMockWithId._id };
      req.body = carUpdateDataMock;
      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carUpdatedMock)).to.be.true;
    });
  });

  describe('destroy', () => {
    const carService = new CarServiceFake();
    const carController = new CarController(carService);

    it('Success', async () => {
      req.params = { id: carMockWithId._id };
      await carController.destroy(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).notCalled).to.be.true;
      expect((res.send as sinon.SinonStub).called).to.be.true;
    });
  });
});
import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';

import { motorcycleMock, motorcycleMockWithId, motorcyclesMock, motorcycleUpdateDataMock, motorcycleUpdatedMock } from '../../mocks/motorcycleMocks';
import MotorcycleServiceFake from '../../helpers/MotorcycleServiceFake';
import MotorcycleController from '../../../controllers/Motorcycle';

const { expect } = chai;

describe('Motorcycle Controller', () => {
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
    const motorcycleService = new MotorcycleServiceFake();
    const motorcycleController = new MotorcycleController(motorcycleService);

    it('Success', async () => {
      req.body = motorcycleMock;
      await motorcycleController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  });

  describe('getAll', () => {
    const motorcycleService = new MotorcycleServiceFake();
    const motorcycleController = new MotorcycleController(motorcycleService);

    it('Success', async () => {
      await motorcycleController.getAll(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcyclesMock)).to.be.true;
    });
  });

  describe('getById', () => {
    const motorcycleService = new MotorcycleServiceFake();
    const motorcycleController = new MotorcycleController(motorcycleService);

    it('Success', async () => {
      req.params = { id: motorcycleMockWithId._id };
      await motorcycleController.getById(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  });

  describe('update', () => {
    const motorcycleService = new MotorcycleServiceFake();
    const motorcycleController = new MotorcycleController(motorcycleService);

    it('Success', async () => {
      req.params = { id: motorcycleMockWithId._id };
      req.body = motorcycleUpdateDataMock;
      await motorcycleController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleUpdatedMock)).to.be.true;
    });
  });

  describe('destroy', () => {
    const motorcycleService = new MotorcycleServiceFake();
    const motorcycleController = new MotorcycleController(motorcycleService);

    it('Success', async () => {
      req.params = { id: motorcycleMockWithId._id };
      await motorcycleController.destroy(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).notCalled).to.be.true;
      expect((res.send as sinon.SinonStub).called).to.be.true;
    });
  });
});
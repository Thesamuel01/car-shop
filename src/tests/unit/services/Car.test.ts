import * as sinon from 'sinon';
import chai from 'chai';

import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { carMock, carMockWithId, carsMock, carUpdateDataMock, carUpdatedMock } from '../../mocks/carMocks';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';

const { expect } = chai;

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  let readOneStub: sinon.SinonStub;
  let updateStub: sinon.SinonStub;
  let deleteStub: sinon.SinonStub;

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves(carsMock);

    readOneStub = sinon.stub(carModel, 'readOne')
    updateStub = sinon.stub(carModel, 'update')
    deleteStub = sinon.stub(carModel, 'delete')
  });

  after(()=>{
    readOneStub.restore();
    updateStub.restore();
    deleteStub.restore();

    (carModel.create as sinon.SinonStub).restore();
    (carModel.read as sinon.SinonStub).restore();
  });

  describe('create', () => {
		it('Success', async () => {
			const carCreated = await carService.create(carMock);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Invalid schema', async () => {
			let error;
			try {
				await carService.create({});
			} catch (err) {
				error = err
			}

			expect(error).to.be.instanceOf(ZodError);
		});
  });

  describe('read', () => {
		it('Success', async () => {
			const carsFound = await carService.read();

			expect(carsFound).to.be.deep.equal(carsMock);
		});
  });

  describe('readOne', () => {
		it('Success', async () => {
      readOneStub.resolves(carMockWithId);

			const carFound = await carService.readOne('62cf1fc6498565d94eba52cd');

			expect(carFound).to.be.deep.equal({ ...carMockWithId });
		});

		it('_id not found', async () => {
      readOneStub.resolves(null);

			let error;

			try {
				await carService.readOne('123wrong456ID');
			} catch (err: any) {
				error = err
			}

			expect(error, 'error should be defined').not.to.be.undefined;
			expect(error?.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
  });

  describe('update', () => {
		it('Success', async () => {
      updateStub.resolves(carUpdatedMock);

			const carFound = await carService.update('62cf1fc6498565d94eba52cd', { ...carUpdateDataMock });

			expect(carFound).to.be.deep.equal(carUpdatedMock);
		});

    it('_id not found', async () => {
      updateStub.resolves(null);

			let error;

			try {
				await carService.update('123wrong456ID', { ...carUpdateDataMock });
			} catch (err: any) {
				error = err
			}

			expect(error, 'error should be defined').not.to.be.undefined;
			expect(error?.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});

		it('Invalid schema', async () => {
      updateStub.resolves(carUpdatedMock);

			let error;

			try {
				await carService.update('62cf1fc6498565d94eba52cd', {});
			} catch (err: any) {
				error = err
			}

			expect(error).to.be.instanceOf(ZodError);
		});
  });

  describe('delete', () => {
		it('Success', async () => {
      deleteStub.resolves(carMockWithId);

			const carFound = await carService.delete('62cf1fc6498565d94eba52cd');

			expect(carFound).to.be.deep.equal(carMockWithId);
		});

		it('_in not found', async () => {
      deleteStub.resolves(null);

			let error;

			try {
				await carService.delete('123wrong456ID');
			} catch (err: any) {
				error = err
			}

			expect(error, 'error should be defined').not.to.be.undefined;
			expect(error?.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
  });
});
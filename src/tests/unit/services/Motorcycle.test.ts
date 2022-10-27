import * as sinon from 'sinon';
import chai from 'chai';

import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';
import { motorcycleMock, motorcycleMockWithId, motorcyclesMock, motorcycleUpdateDataMock, motorcycleUpdatedMock } from '../../mocks/motorcycleMocks';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';

const { expect } = chai;

describe('Motorcycle Service', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);

  let readOneStub: sinon.SinonStub;
  let updateStub: sinon.SinonStub;
  let deleteStub: sinon.SinonStub;

  before(() => {
    sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleModel, 'read').resolves(motorcyclesMock);

    readOneStub = sinon.stub(motorcycleModel, 'readOne')
    updateStub = sinon.stub(motorcycleModel, 'update')
    deleteStub = sinon.stub(motorcycleModel, 'delete')
  });

  after(()=>{
    readOneStub.restore();
    updateStub.restore();
    deleteStub.restore();

    (motorcycleModel.create as sinon.SinonStub).restore();
    (motorcycleModel.read as sinon.SinonStub).restore();
  });

  describe('create', () => {
		it('Success', async () => {
			const motorcycleCreated = await motorcycleService.create(motorcycleMock);

			expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Invalid schema', async () => {
			let error;
			try {
				await motorcycleService.create({});
			} catch (err) {
				error = err
			}

			expect(error).to.be.instanceOf(ZodError);
		});
  });

  describe('read', () => {
		it('Success', async () => {
			const motorcyclesFound = await motorcycleService.read();

			expect(motorcyclesFound).to.be.deep.equal(motorcyclesMock);
		});
  });

  describe('readOne', () => {
		it('Success', async () => {
      readOneStub.resolves(motorcycleMockWithId);

			const motorcycleFound = await motorcycleService.readOne('62cf1fc6498565d94eba52cd');

			expect(motorcycleFound).to.be.deep.equal({ ...motorcycleMockWithId });
		});

		it('_id not found', async () => {
      readOneStub.resolves(null);

			let error;

			try {
				await motorcycleService.readOne('123wrong456ID');
			} catch (err: any) {
				error = err
			}

			expect(error, 'error should be defined').not.to.be.undefined;
			expect(error?.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
  });

  describe('update', () => {
		it('Success', async () => {
      updateStub.resolves(motorcycleUpdatedMock);

			const motorcycleFound = await motorcycleService.update('62cf1fc6498565d94eba52cd', { ...motorcycleUpdateDataMock });

			expect(motorcycleFound).to.be.deep.equal(motorcycleUpdatedMock);
		});

    it('_id not found', async () => {
      updateStub.resolves(null);

			let error;

			try {
				await motorcycleService.update('123wrong456ID', { ...motorcycleUpdateDataMock });
			} catch (err: any) {
				error = err
			}

			expect(error, 'error should be defined').not.to.be.undefined;
			expect(error?.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});

		it('Invalid schema', async () => {
      updateStub.resolves(motorcycleUpdatedMock);

			let error;

			try {
				await motorcycleService.update('62cf1fc6498565d94eba52cd', {});
			} catch (err: any) {
				error = err
			}

			expect(error).to.be.instanceOf(ZodError);
		});
  });

  describe('delete', () => {
		it('Success', async () => {
      deleteStub.resolves(motorcycleMockWithId);

			const motorcycleFound = await motorcycleService.delete('62cf1fc6498565d94eba52cd');

			expect(motorcycleFound).to.be.deep.equal(motorcycleMockWithId);
		});

		it('_in not found', async () => {
      deleteStub.resolves(null);

			let error;

			try {
				await motorcycleService.delete('123wrong456ID');
			} catch (err: any) {
				error = err
			}

			expect(error, 'error should be defined').not.to.be.undefined;
			expect(error?.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
  });
});
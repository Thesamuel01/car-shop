import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';

import MotorcycleModel from '../../../models/Motorcycle';
import { motorcycleMock, motorcycleMockWithId, motorcycleUpdateDataMock, motorcycleUpdatedMock } from '../../mocks/motorcycleMocks';

const { expect } = chai;

describe('Motorcycle Model', () => {
  const motorcyleModel = new MotorcycleModel();
  let findByIdStub: sinon.SinonStub;
  let findByIdAndUpdateStub: sinon.SinonStub;
  let findByIdAndDeleteStub: sinon.SinonStub;

  before(() => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'find').resolves([{ ...motorcycleMock }]);

    findByIdStub = sinon.stub(Model, 'findById')
    findByIdAndUpdateStub = sinon.stub(Model, 'findByIdAndUpdate')
    findByIdAndDeleteStub = sinon.stub(Model, 'findByIdAndDelete')
  });

  after(()=>{
    findByIdStub.restore();
    findByIdAndUpdateStub.restore();
    findByIdAndDeleteStub.restore();

    (Model.create as sinon.SinonStub).restore();
    (Model.find as sinon.SinonStub).restore();
  });

  describe('create', () => {
    it('successfully created', async () => {
			const newMotorcycle = await motorcyleModel.create(motorcycleMock);

			expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
		});
  });

  describe('read', () => {
    it('successfully found', async () => {
			const motorcyclesFound = await motorcyleModel.read();

			expect(motorcyclesFound).to.be.deep.equal([motorcycleMock]);
		});
  });

  describe('readOne', () => {
    it('successfully found', async () => {
      findByIdStub.resolves(motorcycleMockWithId);

			const motorcycleFound = await motorcyleModel.readOne('62cf1fc6498565d94eba52cd');

			expect(motorcycleFound).to.be.deep.equal(motorcycleMockWithId);
		});

    it('_id not found', async () => {
      findByIdStub.resolves(null);

			try {
				await motorcyleModel.readOne('098wrong765ID');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
  });

  describe('update', () => {
    it('successfully update', async () => {
      findByIdAndUpdateStub.resolves(motorcycleUpdatedMock);

			const motorcycleUpdated = await motorcyleModel.update('62cf1fc6498565d94eba52cd', { ...motorcycleUpdateDataMock });

			expect(motorcycleUpdated).to.be.deep.equal(motorcycleUpdatedMock);
		});

    it('_id not found', async () => {
      findByIdAndUpdateStub.resolves(null);

			try {
				await motorcyleModel.update('098wrong765ID', { ...motorcycleUpdateDataMock });
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
  });

  describe('delete', () => {
    it('successfully delete', async () => {
      findByIdAndDeleteStub.resolves(motorcycleMockWithId);

			const motorcycleDeleted = await motorcyleModel.delete('62cf1fc6498565d94eba52cd');

			expect(motorcycleDeleted).to.be.deep.equal(motorcycleMockWithId);
		});

    it('_id not found', async () => {
      findByIdAndDeleteStub.resolves(null);

			try {
				await motorcyleModel.delete('098wrong765ID');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
  });
});
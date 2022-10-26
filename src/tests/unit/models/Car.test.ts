import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';

import CarModel from '../../../models/Car';
import { carMock, carMockWithId, carUpdateDataMock, carUpdatedMock } from '../../mocks/carMocks';

const { expect } = chai;

describe('Car Model', () => {
  const carModel = new CarModel();
  let findByIdStub: sinon.SinonStub;
  let findByIdAndUpdateStub: sinon.SinonStub;
  let findByIdAndDeleteStub: sinon.SinonStub;

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([{ ...carMock }]);

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
			const newFrame = await carModel.create(carMock);

			expect(newFrame).to.be.deep.equal(carMockWithId);
		});
  });

  describe('read', () => {
    it('successfully found', async () => {
			const carsFound = await carModel.read();

			expect(carsFound).to.be.deep.equal([carMock]);
		});
  });

  describe('readOne', () => {
    it('successfully found', async () => {
      findByIdStub.resolves(carMockWithId);

			const carFound = await carModel.readOne('62cf1fc6498565d94eba52cd');

			expect(carFound).to.be.deep.equal(carMockWithId);
		});

    it('_id not found', async () => {
      findByIdStub.resolves(null);

			try {
				await carModel.readOne('098wrong765ID');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
  });

  describe('update', () => {
    it('successfully update', async () => {
      findByIdAndUpdateStub.resolves(carUpdatedMock);

			const carUpdated = await carModel.update('62cf1fc6498565d94eba52cd', { ...carUpdateDataMock });

			expect(carUpdated).to.be.deep.equal(carUpdatedMock);
		});

    it('_id not found', async () => {
      findByIdAndUpdateStub.resolves(null);

			try {
				await carModel.update('098wrong765ID', { ...carUpdateDataMock });
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
  });

  describe('delete', () => {
    it('successfully delete', async () => {
      findByIdAndDeleteStub.resolves(carMockWithId);

			const carDeleted = await carModel.delete('62cf1fc6498565d94eba52cd');

			expect(carDeleted).to.be.deep.equal(carMockWithId);
		});

    it('_id not found', async () => {
      findByIdAndDeleteStub.resolves(null);

			try {
				await carModel.delete('098wrong765ID');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
  });
});
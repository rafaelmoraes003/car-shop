import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import { motorcycleMock, motorcycleMockWithId } from '../../mocks/motorcycles';
import MotorcyclesModel from '../../../models/MotorcyclesModel';
import { IMotorcycle } from '../../../interfaces/IMotorcycle';
const { expect } = chai;

describe('Motorcycles Model', () => {
  const motorcyclesModel = new MotorcyclesModel();

  afterEach(async() => {
    sinon.restore();
  });

  describe('Creating a motorcycle', () => {

    before(async () => {
      sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    });

    it('Succesfully created', async () => {
      const createdMotorcycle = await motorcyclesModel.create(motorcycleMock as IMotorcycle);
      expect(createdMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

  });


});
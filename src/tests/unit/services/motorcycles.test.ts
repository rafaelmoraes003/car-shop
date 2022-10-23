import * as sinon from 'sinon';
import chai from 'chai';
import { motorcycleMock, motorcycleMockWithId } from '../../mocks/motorcycles';
import StatusCodes from '../../../interfaces/StatusCodes';
import MotorcyclesModel from '../../../models/MotorcyclesModel';
import MotorcyclesService from '../../../services/MotorcyclesService';
import { IMotorcycle } from '../../../interfaces/IMotorcycle';
const { expect } = chai;

describe('Motorcycles Service', () => {
  const motorcyclesModel = new MotorcyclesModel();
  const motorcyclesService = new MotorcyclesService(motorcyclesModel);

  afterEach(async () => {
    sinon.restore();
  });

  describe('Creating a motorcycle', () => {

    before(async () => {
      sinon.stub(motorcyclesModel, 'create').resolves(motorcycleMockWithId as IMotorcycle);
    });

    it('Succesfully created', async () => {
      const createdMotorcycle = await motorcyclesService.create(motorcycleMock as IMotorcycle);
      expect(createdMotorcycle).to.be.deep.equal({
        code: StatusCodes.CREATED,
        data: motorcycleMockWithId,
      });
    });

    it('Semantic error', async () => {
      try {
        await motorcyclesService.create({ ...motorcycleMock, model: '' } as IMotorcycle);
      } catch (error: any) {
        expect(error.message).to.be.equal('Should be at least 3 characters');
      }
    });

  });

  

});
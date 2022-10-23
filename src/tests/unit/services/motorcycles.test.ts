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

  describe('Searching all motorcycles', () => {

    before(async () => {
      sinon.stub(motorcyclesModel, 'read').resolves([motorcycleMockWithId] as IMotorcycle[]);
    });

    it('Successfully found', async () => {
      const motorcycle = await motorcyclesService.read();
      expect(motorcycle).to.deep.equal({
        code: StatusCodes.OK,
        data: [motorcycleMockWithId],
      });
    });

  });

  describe('Searching one motorcycle', () => {

    describe('Succesfully found', () => {

      before(async () => {
        sinon.stub(motorcyclesModel, 'readOne').resolves(motorcycleMockWithId as IMotorcycle);
      });

      it('Returns motorcycle with code 200', async () => {
        const motorcycle = await motorcyclesService.readOne(motorcycleMockWithId._id);
        expect(motorcycle).to.be.deep.equal({
          code: StatusCodes.OK,
          data: motorcycleMockWithId,
        });
      });

    });

    describe('Not found', () => {

      before(async () => {
        sinon.stub(motorcyclesModel, 'readOne').resolves(null);
      });
  
      it('Throws error "Object not found"', async () => {
        try {
          await motorcyclesService.readOne(motorcycleMockWithId._id);
        } catch (error: any) {
          expect(error.message).to.be.equal('Object not found');
        }
      });

    });

    describe('Invalid ObjectId', () => {

      it('Throws error "Id must have 24 hexadecimal characters"', async () => {
        try {
          await motorcyclesService.readOne('123');
        } catch (error: any) {
          expect(error.message).to.be.equal('Id must have 24 hexadecimal characters');
        }
      });

    });
  });

  
});
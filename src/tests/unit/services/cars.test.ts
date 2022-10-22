import * as sinon from 'sinon';
import chai from 'chai';
import CarsModel from '../../../models/CarsModel';
import CarsService from '../../../services/CarsService';
import { carMock, carMockWithId } from '../../mocks/cars';
import StatusCodes from '../../../interfaces/StatusCodes';
import CustomError from '../../../interfaces/CustomError';
import { ICar } from '../../../interfaces/ICar';
const { expect } = chai;

describe('Cars Service', () => {
  const carsModel = new CarsModel();
  const carsService = new CarsService(carsModel);

  afterEach(async () => {
    sinon.restore();
  });

  describe('Creating a car', () => {

    before(async () => {
      sinon.stub(carsModel, 'create').resolves(carMockWithId);
    });

    it('Succesfully created', async () => {
      const createdCar = await carsService.create(carMock);
      expect(createdCar).to.be.deep.equal({
        code: StatusCodes.CREATED,
        data: carMockWithId,
      });
    });

    it('Semantic error', async () => {
      try {
        await carsService.create({ ...carMock, model: '' });
      } catch (error: any) {
        expect(error.message).to.be.equal('Should be at least 3 characters');
      }
    });

  });

  describe('Searching all cars', () => {

    before(async () => {
      sinon.stub(carsModel, 'read').resolves([carMockWithId]);
    });

    it('Successfully found', async () => {
      const cars = await carsService.read();
      expect(cars).to.deep.equal({
        code: StatusCodes.OK,
        data: [carMockWithId],
      });
    });

  });

  describe('Searching one car', () => {

    describe('Succesfully found', () => {

      before(async () => {
        sinon.stub(carsModel, 'readOne').resolves(carMockWithId);
      });

      it('Returns car with code 200', async () => {
        const car = await carsService.readOne(carMockWithId._id);
        expect(car).to.be.deep.equal({
          code: StatusCodes.OK,
          data: carMockWithId,
        });
      });

    });

    describe('Not found', () => {

      before(async () => {
        sinon.stub(carsModel, 'readOne').resolves(null);
      });
  
      it('Throws error "Object not found"', async () => {
        try {
          await carsService.readOne(carMockWithId._id);
        } catch (error: any) {
          expect(error.message).to.be.equal('Object not found');
        }
      });

    });

    describe('Invalid ObjectId', () => {

      it('Throws error "Id must have 24 hexadecimal characters"', async () => {
        try {
          await carsService.readOne('123');
        } catch (error: any) {
          expect(error.message).to.be.equal('Id must have 24 hexadecimal characters');
        }
      });

    });
  });

  describe('Updating a car', () => {

    describe('Successfully updated', () => {

      before(async () => {
        sinon.stub(carsModel, 'update').resolves({
          ...carMockWithId,
          model: 'Jeep Renegade',
        });
      });

      it('Returns updated car with code 200', async () => {
        const updatedCar = await carsService.update(
          carMockWithId._id,
          { ...carMockWithId, model: 'Jeep Renegade' },
        );
        expect(updatedCar).to.be.deep.equal({
          code: StatusCodes.OK,
          data: { ...carMockWithId, model: 'Jeep Renegade' },
        });
      });

    });

    describe('Semantic error', () => {

      it('Throws error "Required"', async () => {
        try {
          await carsService.update(carMockWithId._id, {} as ICar);
        } catch (error: any) {
          expect(error.message).to.be.equal('Required');
        }
      });

    });

    describe('Invalid ObjectId', () => {

      it('Throws error "Id must have 24 hexadecimal characters"', async () => {
        try {
          await carsService.update('123', carMock);
        } catch (error: any) {
          expect(error.message).to.be.equal('Id must have 24 hexadecimal characters');
        }
      });

    });

    describe('Not found', () => {

      before(async () => {
        sinon.stub(carsModel, 'update').resolves(null);
      });

      it('Throws error "Object not found"', async () => {
        try {
          await carsService.update('111111111111111111111111', carMock);
        } catch (error: any) {
          expect(error.message).to.be.equal('Object not found');
        }
      });

    });

  });

  describe('Deletind a car', () => {

    describe('Succesfully deleted', () => {

      before(async () => {
        sinon.stub(carsModel, 'delete').resolves(carMockWithId);
      });

      it('Returns code 204', async () => {
        const deletedCar = await carsService.delete(carMockWithId._id);
        expect(deletedCar).to.be.deep.equal({
          code: StatusCodes.SUCCESS_NO_CONTENT,
        });
      })

    });

    describe('Invalid ObjectId', () => {

      it('Throws error "Id must have 24 hexadecimal characters"', async () => {
        try {
          await carsService.delete('123');
        } catch (error: any) {
          expect(error.message).to.be.equal('Id must have 24 hexadecimal characters');
        }
      });

    });

    describe('Not found', () => {

      before(async () => {
        sinon.stub(carsModel, 'delete').resolves(null);
      });

      it('Throws error "Object not found"', async () => {
        try {
          await carsService.delete('111111111111111111111111');
        } catch (error: any) {
          expect(error.message).to.be.equal('Object not found');
        }
      });

    });

  });

});
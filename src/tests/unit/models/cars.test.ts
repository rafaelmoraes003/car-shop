import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import CarsModel from '../../../models/CarsModel';
import { carMock, carMockWithId } from '../../mocks/cars';
const { expect } = chai;

describe('Cars Model', () => {
  const carsModel = new CarsModel();

  afterEach(async() => {
    sinon.restore();
  });

  describe('Creating a car', () => {

    before(async () => {
      sinon.stub(Model, 'create').resolves(carMockWithId);
    });

    it('Succesfully created', async () => {
      const createdCar = await carsModel.create(carMock);
      expect(createdCar).to.be.deep.equal(carMockWithId);
    });

  });

  describe('Searching all cars', () => {

    before(async () => {
      sinon.stub(Model, 'find').resolves([carMockWithId]);
    });

    it('Succesfully found', async () => {
      const cars = await carsModel.read();
      expect(cars).to.be.deep.equal([carMockWithId]);
    });

  });

});
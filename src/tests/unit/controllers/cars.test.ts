import * as sinon from 'sinon';
import chai from 'chai';
import { NextFunction, Request, Response } from 'express';
import CarsModel from '../../../models/CarsModel';
import CarsService from '../../../services/CarsService';
import CarsController from '../../../controllers/CarsController';
import StatusCodes from '../../../interfaces/StatusCodes';
import { carMock, carMockWithId, updatedCarMock, updatedCarMockWithId } from '../../mocks/cars';
const { expect } = chai;

describe('Cars Controller', () => {
  const carsModel = new CarsModel();
  const carsService = new CarsService(carsModel);
  const carsController = new CarsController(carsService);

  const serverError = Error('Server error.');

  const req = {} as Request;
  const res = {} as Response;
  let next = new Function

  after(async () => {
    sinon.restore();
  });

  describe('Creating a car', () => {
    before(async () => {
      sinon.stub(carsService, 'create')
      .onCall(0).resolves({
        code: StatusCodes.CREATED,
        data: carMockWithId,
      })
      .onCall(1).throws(serverError)

      req.body = carMock;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      next = sinon.stub();
    });

    it('Successfully created', async () => {
      await carsController.create(req, res, next as NextFunction);
      expect((res.status as sinon.SinonStub).calledWith(StatusCodes.CREATED)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });

    it('Server error', async () => {
      await carsController.create(req, res, next as NextFunction);
      expect((next as sinon.SinonStub).calledWith(serverError)).to.be.true;
    });

  });

  describe('Searching all cars', () => {

    before(async () => {
      sinon.stub(carsService, 'read')
        .onCall(0).resolves({
          code: StatusCodes.OK,
          data: [carMockWithId],
        })
        .onCall(1).throws(serverError);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      next = sinon.stub();
    });

    it('Successfully found', async () => {
      await carsController.read(req, res, next as NextFunction);
      expect((res.status as sinon.SinonStub).calledWith(StatusCodes.OK)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMockWithId])).to.be.true;
    });

    it('Server error', async () => {
      await carsController.read(req, res, next as NextFunction);
      expect((next as sinon.SinonStub).calledWith(serverError)).to.be.true;
    });

  });

  describe('Searching one car', () => {

    before(async () => {
      sinon.stub(carsService, 'readOne')
        .onCall(0).resolves({
          code: StatusCodes.OK,
          data: carMockWithId,
        })
        .onCall(1).throws(serverError);

      req.params = { id: carMockWithId._id };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      next = sinon.stub();

    });

    it('Successfully found', async () => {
      await carsController.readOne(req, res, next as NextFunction);
      expect((res.status as sinon.SinonStub).calledWith(StatusCodes.OK)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });

    it('Server error', async () => {
      await carsController.readOne(req, res, next as NextFunction);
      expect((next as sinon.SinonStub).calledWith(serverError)).to.be.true;
    });

  });

  describe('Updating a car', () => {
    
    before(async () => {
      sinon.stub(carsService, 'update')
      .onCall(0).resolves({
        code: StatusCodes.OK,
        data: updatedCarMockWithId,
      })
      .onCall(1).throws(serverError);
    
      req.params = { id: carMockWithId._id };
      req.body = updatedCarMock;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      next = sinon.stub();
    });

    it('Successfully updated', async () => {
      await carsController.update(req, res, next as NextFunction);
      expect((res.status as sinon.SinonStub).calledWith(StatusCodes.OK)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(updatedCarMockWithId)).to.be.true;
    });
  
    it('Server error', async () => {
      await carsController.update(req, res, next as NextFunction);
      expect((next as sinon.SinonStub).calledWith(serverError)).to.be.true;
    });

  });

  describe('Deleting a car', () => {
    
    before(async () => {
      sinon.stub(carsService, 'delete')
        .onCall(0).resolves({
          code: StatusCodes.SUCCESS_NO_CONTENT,
        })
        .onCall(1).throws(serverError);
    
      req.params = { id: carMockWithId._id };
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns(res)
      next = sinon.stub();
    });

    it('Successfully deleted', async () => {
      await carsController.delete(req, res, next as NextFunction);
      expect((res.status as sinon.SinonStub).calledWith(StatusCodes.SUCCESS_NO_CONTENT)).to.be.true;
      expect((res.end as sinon.SinonStub).called).to.be.true;
    });

    it('Server error', async () => {
      await carsController.delete(req, res, next as NextFunction);
      expect((next as sinon.SinonStub).calledWith(serverError)).to.be.true;
    });

  });

});
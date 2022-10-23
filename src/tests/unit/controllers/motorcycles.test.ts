import * as sinon from 'sinon';
import chai from 'chai';
import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../../../interfaces/StatusCodes';
import MotorcyclesModel from '../../../models/MotorcyclesModel';
import MotorcyclesService from '../../../services/MotorcyclesService';
import MotorcyclesController from '../../../controllers/MotorcyclesController';
import { motorcycleMock ,motorcycleMockWithId, updatedMotorcycleMock, updatedMotorcycleMockWithId } from '../../mocks/motorcycles';
import { IMotorcycle } from '../../../interfaces/IMotorcycle';
const { expect } = chai;

describe('Motorcycles Controller', () => {
  const motorcyclesModel = new MotorcyclesModel();
  const motorcyclesService = new MotorcyclesService(motorcyclesModel);
  const motorcyclesController = new MotorcyclesController(motorcyclesService);

  const serverError = Error('Server error.');

  const req = {} as Request;
  const res = {} as Response;
  let next = new Function

  after(async () => {
    sinon.restore();
  });

  describe('Creating a motorcycle', () => {
    before(async () => {
      sinon.stub(motorcyclesService, 'create')
      .onCall(0).resolves({
        code: StatusCodes.CREATED,
        data: motorcycleMockWithId as IMotorcycle,
      })
      .onCall(1).throws(serverError)

      req.body = motorcycleMock;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      next = sinon.stub();
    });

    it('Successfully created', async () => {
      await motorcyclesController.create(req, res, next as NextFunction);
      expect((res.status as sinon.SinonStub).calledWith(StatusCodes.CREATED)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });

    it('Server error', async () => {
      await motorcyclesController.create(req, res, next as NextFunction);
      expect((next as sinon.SinonStub).calledWith(serverError)).to.be.true;
    });

  });

  describe('Searching all motorcycles', () => {

    before(async () => {
      sinon.stub(motorcyclesService, 'read')
        .onCall(0).resolves({
          code: StatusCodes.OK,
          data: [motorcycleMockWithId] as IMotorcycle[],
        })
        .onCall(1).throws(serverError);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      next = sinon.stub();
    });

    it('Successfully found', async () => {
      await motorcyclesController.read(req, res, next as NextFunction);
      expect((res.status as sinon.SinonStub).calledWith(StatusCodes.OK)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([motorcycleMockWithId])).to.be.true;
    });

    it('Server error', async () => {
      await motorcyclesController.read(req, res, next as NextFunction);
      expect((next as sinon.SinonStub).calledWith(serverError)).to.be.true;
    });

  });

  describe('Searching one motorcyle', () => {

    before(async () => {
      sinon.stub(motorcyclesService, 'readOne')
        .onCall(0).resolves({
          code: StatusCodes.OK,
          data: motorcycleMockWithId as IMotorcycle,
        })
        .onCall(1).throws(serverError);

      req.params = { id: motorcycleMockWithId._id };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      next = sinon.stub();

    });

    it('Successfully found', async () => {
      await motorcyclesController.readOne(req, res, next as NextFunction);
      expect((res.status as sinon.SinonStub).calledWith(StatusCodes.OK)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });

    it('Server error', async () => {
      await motorcyclesController.readOne(req, res, next as NextFunction);
      expect((next as sinon.SinonStub).calledWith(serverError)).to.be.true;
    });

  });

  describe('Updating a motorcycle', () => {
    
    before(async () => {
      sinon.stub(motorcyclesService, 'update')
      .onCall(0).resolves({
        code: StatusCodes.OK,
        data: updatedMotorcycleMockWithId as IMotorcycle & { _id: string },
      })
      .onCall(1).throws(serverError);
    
      req.params = { id: updatedMotorcycleMockWithId._id };
      req.body = updatedMotorcycleMock;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      next = sinon.stub();
    });

    it('Successfully updated', async () => {
      await motorcyclesController.update(req, res, next as NextFunction);
      expect((res.status as sinon.SinonStub).calledWith(StatusCodes.OK)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(updatedMotorcycleMockWithId)).to.be.true;
    });
  
    it('Server error', async () => {
      await motorcyclesController.update(req, res, next as NextFunction);
      expect((next as sinon.SinonStub).calledWith(serverError)).to.be.true;
    });

  });

  describe('Deleting a motorcycle', () => {
    
    before(async () => {
      sinon.stub(motorcyclesService, 'delete')
        .onCall(0).resolves({
          code: StatusCodes.SUCCESS_NO_CONTENT,
        })
        .onCall(1).throws(serverError);
    
      req.params = { id: motorcycleMockWithId._id };
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns(res)
      next = sinon.stub();
    });

    it('Successfully deleted', async () => {
      await motorcyclesController.delete(req, res, next as NextFunction);
      expect((res.status as sinon.SinonStub).calledWith(StatusCodes.SUCCESS_NO_CONTENT)).to.be.true;
      expect((res.end as sinon.SinonStub).called).to.be.true;
    });

    it('Server error', async () => {
      await motorcyclesController.delete(req, res, next as NextFunction);
      expect((next as sinon.SinonStub).calledWith(serverError)).to.be.true;
    });

  });


});
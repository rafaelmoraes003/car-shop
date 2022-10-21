import { NextFunction, Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

class CarsController {
  private _carService: IService<ICar>;

  constructor(service: IService<ICar>) {
    this._carService = service;
  }
}

export default CarsController;
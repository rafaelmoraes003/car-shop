import { NextFunction, Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

class CarsController {
  private _carService: IService<ICar>;

  constructor(service: IService<ICar>) {
    this._carService = service;
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const { model, year, color, status, buyValue, seatsQty, doorsQty } = req.body;
    try {
      const { code, data } = await this._carService.create({
        model, year, color, status, buyValue, seatsQty, doorsQty,
      });
      return res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };

  public read = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const { code, data } = await this._carService.read();
      return res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };

  public readOne = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { code, data } = await this._carService.readOne(id);
      return res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { model, year, color, status, buyValue, seatsQty, doorsQty } = req.body;
    try {
      const { code, data } = await this._carService.update(
        id,
        { model, year, color, status, buyValue, seatsQty, doorsQty },
      );
      return res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default CarsController;
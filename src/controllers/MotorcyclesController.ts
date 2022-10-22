import { NextFunction, Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';

class MotorcyclesController {
  private _motorcycleService: IService<IMotorcycle>;

  constructor(service: IService<IMotorcycle>) {
    this._motorcycleService = service;
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const { model, year, color, status, buyValue, category, engineCapacity } = req.body;
    try {
      const { code, data } = await this._motorcycleService.create({
        model, year, color, status, buyValue, category, engineCapacity,
      });
      return res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };

  public read = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const { code, data } = await this._motorcycleService.read();
      return res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };

  public readOne = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { code, data } = await this._motorcycleService.readOne(id);
      return res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default MotorcyclesController;
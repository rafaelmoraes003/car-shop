import { NextFunction, Request, Response } from 'express';
import IService from '../interfaces/IService';

abstract class APIController<T> {
  protected _service: IService<T>;

  constructor(service: IService<T>) {
    this._service = service;
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code, data } = await this._service.create(req.body);
      return res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };

  public read = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const { code, data } = await this._service.read();
      return res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };

  public readOne = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { code, data } = await this._service.readOne(id);
      return res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { code, data } = await this._service.update(id, req.body);
      return res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { code } = await this._service.delete(id);
      return res.status(code).end();
    } catch (error) {
      next(error);
    }
  };
}

export default APIController;
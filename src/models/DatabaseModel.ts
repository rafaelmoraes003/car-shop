import { Model, UpdateQuery } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class DatabaseModel<T> implements IModel<T> {
  private _model: Model<T>;
  
  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(obj: T): Promise<T> {
    const createdDoc = await this._model.create(obj);
    return createdDoc;
  }

  public async read(): Promise<T[]> {
    const documents = await this._model.find();
    return documents;
  }

  public async readOne(_id: string): Promise<T | null> {
    const document = await this._model.findOne({ _id });
    return document;
  }

  public async update(_id: string, obj: T): Promise<T | null> {
    const updatedDocument = await this._model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
    );
    return updatedDocument;
  }

  public async delete(_id: string): Promise<T | null> {
    const deletedDocument = await this._model.findByIdAndDelete({ _id });
    return deletedDocument;
  }
}

export default DatabaseModel;
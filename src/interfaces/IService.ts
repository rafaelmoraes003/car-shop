import StatusCodes from './StatusCodes';

interface IServiceResponse<T> {
  code: StatusCodes,
  data?: T,
}

interface IService<T> {
  create(obj: T): Promise<IServiceResponse<T>>,
  read(): Promise<IServiceResponse<T[]>>,
  readOne(_id: string): Promise<IServiceResponse<T>>
  update(_id: string, obj: T): Promise<IServiceResponse<T>>,
  delete(_id: string): Promise<IServiceResponse<undefined>>
}

export default IService;
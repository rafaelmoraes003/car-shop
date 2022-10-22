import StatusCodes from './StatusCodes';

interface IServiceResponse<T> {
  code: StatusCodes,
  data: T,
}

interface IService<T> {
  create(obj: T): Promise<IServiceResponse<T>>,
  read(): Promise<IServiceResponse<T[]>>,
  readOne(_id: string): Promise<IServiceResponse<T>>
}

export default IService;
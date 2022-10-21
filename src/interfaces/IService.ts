import StatusCodes from './StatusCodes';

interface IServiceResponse<T> {
  code: StatusCodes,
  data?: T,
  error?: string,
}

interface IService<T> {
  create(obj: T): Promise<IServiceResponse<T>>,
}

export default IService;
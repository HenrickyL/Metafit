export interface IUseCase<REQ,RES>{
  execute(request: REQ): Promise<RES> 
  validateAsync?: (request: REQ)=> Promise<void>;
  validate?: (request: REQ)=> void;
}
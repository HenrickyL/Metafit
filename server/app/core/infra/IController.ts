import {HttpResponse} from '@core/domain/HttpResponses'


export interface IController<Req,Res>{
  handle: (request: Req) => Promise<HttpResponse<Res>>
  formatData?:(request: Req)=> Req;
}


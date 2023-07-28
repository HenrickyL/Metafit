import { IMiddleware } from "@core/infra/IMiddleware"
import { NextFunction, Request, Response } from "express"
import { ErrorException } from '@core/Exceptions';

export const adaptMiddleware = (middleware: IMiddleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const requestData = {
      accessToken: request.headers?.['x-access-token'],
      ...(request.headers || {}),
    }
    try{
      await middleware.handle(requestData, request.body)
      // Object.assign(request,httpResponse.body)
      return next()
    }catch(e){
      if(e instanceof ErrorException){
        return response.status(e.statusCode).json({
          type: e.type,
          statusCode: e.statusCode,
          message: e.message,
          error: e.data
        })
      }else{
        return response.status(500).json({
          type: 'InterError',
          statusCode: 500,
          message: e,
          error: e.data
        })
      }
    }
  }
}
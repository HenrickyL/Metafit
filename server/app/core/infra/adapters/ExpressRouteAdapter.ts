import { Request, Response } from "express"
import { ErrorException } from "@core/Exceptions"
import { IController } from "../IController"

export function adaptRoute<Req,Res>(controller: IController<Req,Res>) {

  return async (request: Request, response: Response) => {
    const requestData = {
      ...request.body,
      ...request.params,
      ...request.query,
    }
    try{
      const httpResponse = await controller.handle(requestData)
      return response.status(httpResponse.statusCode).json(httpResponse.body)
    }catch(e){
      if(e instanceof ErrorException){
        return response.status(e.statusCode).json({
          type: e.type,
          statusCode: e.statusCode,
          message: e.message,
          error: e.data
        })
      }else{
        const message: string = e.toString()
        const shortMessage: string = message.split('Argument')[1]
        const isCompleteMessage = shortMessage === undefined || shortMessage.includes('undefined')
        return response.status(500).json({
          type: 'InternalError',
          statusCode: 500,
          error: e,
          message:isCompleteMessage ?  message  : `Argument: "${message.split('Argument')[1]}"`
        })
      }
    }
  }
}

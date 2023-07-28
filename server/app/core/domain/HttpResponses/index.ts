interface HttpResponse<T = any> {
  statusCode: number
  body: T | null
}


export{
  HttpResponse,
  Ok,
  Created,
  NoContent
}

function Ok<T>(dto:T):HttpResponse<T>{
  return {
    statusCode:200,
    body:dto
  }
}
function Created<T>(dto: T | null = null): HttpResponse<T> {
  return {
    statusCode: 201,
    body: dto,
  }
}

function NoContent(): HttpResponse<void> {
  return {
    statusCode: 204,
    body: null,
  }
}
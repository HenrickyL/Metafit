export interface IMiddleware<REQ = any, Body = any, RES = any> {
  handle: (httpRequest: REQ, httpBody?: Body) => RES
}

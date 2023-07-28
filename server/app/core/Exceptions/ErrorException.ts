export abstract class ErrorException extends Error {
    protected _code : number
    protected _data? : any
  
    constructor(param?: string, data?: any) {
      super(param || `Internal Server Error.`)
      this.name = 'Internal Server Error'
      this._code = 500
      this._data = data
    }
    get statusCode():number{
      return this._code
    }
    get type():string{
      return this.name
    }
    get data():any {
      return this._data
    }
  }
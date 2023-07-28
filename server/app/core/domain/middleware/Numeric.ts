export abstract class Numeric{
    static formatOr(value:string | number, orValue: number):number{
      return value ? Number(value) : orValue
    }
    static format(value:string | number):number{
      return value ? Number(value) : 0
    }
    static formatSkip(value:string | number):number{
        return Number(value) || 0
    }
    static formatTake(value:string | number):number{
      return Number(value) || 10
  }
  }
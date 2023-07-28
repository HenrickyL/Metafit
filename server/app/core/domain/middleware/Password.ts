import bcrypt from 'bcryptjs'
import { InvalidPasswordError, PasswordAccessNotAllowed } from '@modules/user/errors';
import { InvalidPasswordErrors } from '@modules/user/domain/enums';


export class Password{
  private readonly _password: string
  private readonly _hashed?: boolean

  private constructor(password: string, hashed: boolean) {
    this._password = password
    this._hashed = hashed
  }

  public static format(password: string): string{
    return password?.trim()
  }

  static errors: InvalidPasswordErrors[] = []
  private static validate(password: string): boolean {
    Password.errors = []
    password = password.trim()
    // "8 characters",
    if(password.length < 8){
      Password.errors.push(InvalidPasswordErrors["8 characters"])
    }
    // "one number",
    if(! /[0-9]/.test(password)){
      Password.errors.push(InvalidPasswordErrors["one number"])
    }
    // "at least one capital letter"
    if(! /[A-Z]/.test(password)){
      Password.errors.push(InvalidPasswordErrors["at least one Upper letter"])
    }
    return Password.errors.length == 0
  }

  static create(password: string, hashed: boolean = false): Password {
    if(!password) return null
    if (!hashed && !this.validate(password)) {
      throw new InvalidPasswordError(Password.errors);
    }
    return new Password(password, hashed)
  }


  get value():string{
    if(!this._hashed)
      throw new PasswordAccessNotAllowed();
    return this._password
  }
  get isHashed():boolean{
    return this._hashed
  }

  public async getHashedValue(): Promise<string> {
    if (this._hashed) {
      return this._password
    }
    return await bcrypt.hash(this._password, 10)
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    return  await bcrypt.compare(plainTextPassword, this._password)
  }
}
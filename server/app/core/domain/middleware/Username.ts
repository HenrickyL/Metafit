import { InvalidUsernameLengthError } from "@modules/user/errors";

export abstract class Username{
  private static isValid(name: string): boolean {
    return !name || name.trim().length > 2
  }
  static create(name: string): string {
    if (!this.isValid(name)) {
      throw new InvalidUsernameLengthError(name);
    }
    return this.format(name);
  }

  static format(username:string):string{
    return username ? username.toLocaleLowerCase(): null
  }
}
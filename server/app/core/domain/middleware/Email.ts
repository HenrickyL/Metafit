import { InvalidEmailError } from "@modules/user/errors";

export abstract class Email{
    private static isValid(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static create(email: string): string {
        if (!this.isValid(email)) {
          throw new InvalidEmailError(email);
        }
        return this.format(email);
    }

    static format(email:string):string{
        if(!email) return email
        email = email.trim().toLocaleLowerCase()
        if (!this.isValid(email)) {
            throw new InvalidEmailError(email);
          }
        return email
    }
}
import { InvalidUrlError } from "@modules/user/errors";

export abstract class Url{
    private static isValid(email: string): boolean {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(email);
    }
    static format(url:string):string{
        if(!url) return url
        url = url.trim().toLocaleLowerCase()
        if (!this.isValid(url)) {
            throw new InvalidUrlError(url);
          }
        return url
    }
}
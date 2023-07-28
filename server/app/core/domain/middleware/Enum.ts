import { RequestTypeError } from "../errors";

export abstract class Enum{
    public static isValid<T extends string | number>(value: T, enumObject: Record<string, T>, name: string): void {
        if (!Object.values(enumObject).includes(value))
            throw new RequestTypeError(name, value.toString());
    }

    public static format<T extends string | number>(value: T, enumObject: Record<string, T>, name: string): T {
        if(!value) return value
        Enum.isValid(value, enumObject, name)
        return value
    }
}
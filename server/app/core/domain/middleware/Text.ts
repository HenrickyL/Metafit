export abstract class Text{
    static format(text:string, disableLower?:boolean):string{
        if(!text) return text
        return disableLower?  text.trim() :text.trim().toLocaleLowerCase() 
    }
}
import { Email } from "./Email";
import { Password } from "./Password";
import { Username } from "./Username";

export {
    Email,
    Password,
    Username
}

export function selectData<DATA>(entityData: DATA, requestData: DATA ): DATA{
    if(!requestData || entityData === requestData){
        return entityData
    }else {
        return requestData
    }
}
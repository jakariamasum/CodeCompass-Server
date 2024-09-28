import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserInDB= async(payload:IUser)=>{
    const result= await User.create(payload);
    return result;
}

export const UserServices={
    createUserInDB
}
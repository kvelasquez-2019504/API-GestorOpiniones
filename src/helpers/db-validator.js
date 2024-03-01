import User from '../users/user.model.js';
import bcryptjs from 'bcryptjs';

export const existsUsername = async( username="")=>{
    const [total]=await Promise.all([
        User.find({username:{$all:username}})
    ]);
    if(total.length==1){
        throw new Error(`The username ${username} already exists in the DataBase`);
    }
}

export const existsUserEmail = async( userEmail="")=>{
    const existsUserEmail = await User.findOne({userEmail});
    if(existsUserEmail){
        throw new Error(`The user email ${userEmail} already exists in the DataBase`);
    }
}
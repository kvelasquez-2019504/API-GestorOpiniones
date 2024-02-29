import User from '../users/user.model.js';

export const existsUsername = async( username="")=>{
    const existsUsername = await User.findOne({username});
    if(existsUsername){
        throw new Error(`The username ${username} already exists in the DataBase`);
    }
}

export const existsUserEmail = async( userEmail="")=>{
    const existsUserEmail = await User.findOne({userEmail});
    if(existsUserEmail){
        throw new Error(`The user email ${userEmail} already exists in the DataBase`);
    }
}
import {request,response} from 'express';
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const userPut= async(req,res)=>{
    
}

export const userPost = async (req ,res)=>{
    const {username,userEmail,password}=req.body;
    const user = new User({username,userEmail,password});
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
    res.status(200).json({
        user
    });
}
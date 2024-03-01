import {request,response} from 'express';
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const userPut= async(req,res)=>{
    console.log("llega al userput");
    const {id} =req.user;
    const {_id,userEmail,publications,comments,...user} =req.body;
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(user.password,salt);
    await User.findByIdAndUpdate(id,user);
    const userSearch = await User.findById(id);
    res.status(200).json({
        userSearch
    });
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
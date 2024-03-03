import {request, response} from 'express';
import Comment from '../comments/comment.model.js';
import User from '../users/user.model.js';

export const commentsGet = async (req=request, res=response)=>{
    const {id} =req.user;
    const userLog =await User.findById(id);
    res.status(200).json({
        comments:userLog.comments
    });
}
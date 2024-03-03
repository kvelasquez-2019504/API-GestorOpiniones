import {request, response} from 'express';
import Comment from '../publications/comment.model.js';
import User from '../comments/comment.model.js';

export const commentsGet = async (req=request, res=response)=>{
    const {id} =req.user;
    const userLog =await User.findById(id);
    res.status(200).json({
        comments:userLog.comments
    });
}
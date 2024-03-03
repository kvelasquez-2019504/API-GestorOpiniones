import {request, response} from 'express';
import Comment from '../comments/comment.model.js';
import User from '../users/user.model.js';

export const commentPost = async (req=request, res=response)=>{
    const {id} =req.user;
    let userLog = await User.findById(id);
    const {idPublication,comment}=req.body;
    const newComment = new Comment({comment:comment,idUser:id,idPublication:idPublication});
    userLog.comments.push(newComment.id);
    await User.findByIdAndUpdate(id,{comments:userLog.comments});
    newComment.save();
    res.status(200).json({
        newComment,
    });
}

export const commentsGet = async (req=request, res=response)=>{
    const {id} =req.user;
    const userLog =await User.findById(id);
    let myComments=[];
    for(let idComment of userLog.comments){
        const comment = await Comment.findById(idComment);
        myComments.push(comment);
    }
    res.status(200).json({
        myComments
    });
}
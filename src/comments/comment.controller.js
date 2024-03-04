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

export const verifyComment = async (req,res,next)=>{
    const { idComment } = req.params;
    const { id } = req.user;
    const userLog = await User.findById(id);
    if (!userLog.comments.includes(idComment)) {
        return res.status(400).json({
            msg: "The comment not is your"
        });
    }
    next();
}

export const commentPut = async(req=request,res=response)=>{
    const { idComment } = req.params;
    const { _id, idUser,idPublication, ...comment } = req.body;
    await Comment.findByIdAndUpdate(idComment,{...comment});
    const newComment = await Comment.findById(idComment);
    res.status(200).json({
        msg:"The comment is now updated",
        newComment
    });
}

export const commentDelete = async(req=request,res=response)=>{
    const {id} = req.user;
    const userLog = await User.findById(id);
    const {idComment} = req.params;
    let index=0;
    if(userLog.comments.includes(idComment)){
        index=userLog.comments.indexOf(idComment);
    }
    const comment = await Comment.findById(idComment);

    //await Comment.deleteOne({_id:idComment});
    res.status(200).json({
        msg:"Your comment is deleted",
        comment,
        index
    })
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
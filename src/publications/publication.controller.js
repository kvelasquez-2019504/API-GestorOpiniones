import { request,response } from "express";
import Publication from '../publications/publication.model.js';
import User from "../users/user.model.js";

export const publicationPost= async (req=request,res=response)=>{
    const {id} =req.user;
    let userLog = await User.findById(id);
    const {title, mainText,category}=req.body;
    const publication = new Publication({title,mainText,category,idUser:id});
    userLog.publications.push(publication.id);
    await User.findByIdAndUpdate(id,{publications:userLog.publications});
    publication.save();
    res.status(200).json({
        msg:"The publication is upload.",
        publication
    })
}
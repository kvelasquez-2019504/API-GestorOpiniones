import { request,response } from "express";

export const publicationPost= async (req=request,res=response)=>{
    const {id} =req.user;
    const {title, mainText,category}=req.body;
    const publication = new Publication({title});
    res.status(200).json({
        msg:"The publication is upload.",

    })
}
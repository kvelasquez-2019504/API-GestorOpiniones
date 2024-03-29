import { request, response } from "express";
import Publication from '../publications/publication.model.js';
import Comment from '../comments/comment.model.js';
import User from "../users/user.model.js";

export const publicationGet = async (req, res) => {
    const { id } = req.user;
    const userLog = await User.findById(id);
    let myPublications = [];
    for (let idPublication of userLog.publications) {
        const { _id,title } = await Publication.findById(idPublication);
        const [numberComments] = await Promise.all([
            Comment.countDocuments({idPublication:idPublication})
        ]);
        myPublications.push({_id,title,numberComments});
    }
    res.status(200).json({
        myPublications
    });
}

export const publicationGetById = async (req, res) => {
    const { idPublication } = req.params;
    const {title,mainText,category} = await Publication.findById(idPublication);
    let comments=[];
    const [countComments,arrayComments] = await Promise.all([
        Comment.countDocuments({idPublication:idPublication}),
        Comment.find({idPublication:idPublication})
    ]);

    for(let comment of arrayComments){
        const {username} = await User.findById(comment.idUser);
        comments.push({username,comment:comment.comment});
    }

    res.status(200).json({
        title,
        mainText,
        category,
        countComments,
        comments
    });
}

export const publicationDelete = async (req = request, res = response) => {
    const { idPublication } = req.params;
    const {id} = req.user;
    const userLog = await User.findById(id);
    const publication = await Publication.findById(idPublication);
    const [arrayComments] = await Promise.all([
        Comment.find({idPublication:idPublication})
    ]);
    let comments=[];
    for(let comment of arrayComments){
        const userSearch = await User.findById(comment.idUser);
        let indexComment =userSearch.comments.indexOf(comment._id);
        userSearch.comments.pop(indexComment);
        await User.findByIdAndUpdate(userSearch._id,{comments:userSearch.comments});
        await Comment.deleteOne({_id:comment._id});
        comments.push({username:userSearch.username,comment:comment.comment});
    }
    userLog.publications.pop(userLog.publications.indexOf(idPublication));
    await User.findByIdAndUpdate(id,{publications:userLog.publications});
    await Publication.deleteOne({_id:idPublication});
    res.status(200).json({
        msg: "Deleted publication",
        publication,
        comments
    });

}

export const verifyIdPublication = async (req, res, next) => {
    const { idPublication } = req.params;
    const { id } = req.user;
    const userLog = await User.findById(id);
    if (!userLog.publications.includes(idPublication)) {
        return res.status(400).json({
            msg: "The publication not is your"
        });
    }
    next();
}

export const publicationPut = async (req = request, res = response) => {
    const { idPublication } = req.params;
    const { _id, idUser, ...publication } = req.body;
    await Publication.findByIdAndUpdate(idPublication, { ...publication });
    const newPublication = await Publication.findById(idPublication);
    res.status(200).json({
        msg: "The publication is now updated",
        newPublication
    });
}

export const publicationPost = async (req = request, res = response) => {
    const { id } = req.user;
    let userLog = await User.findById(id);
    const { title, mainText, category } = req.body;
    const publication = new Publication({ title, mainText, category, idUser: id });
    userLog.publications.push(publication.id);
    await User.findByIdAndUpdate(id, { publications: userLog.publications });
    publication.save();
    res.status(200).json({
        msg: "The publication is upload.",
        publication
    })
}
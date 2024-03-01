import jwt  from "jsonwebtoken";
import User from "../users/user.model.js";

export const validateJWT = async(req,res,next)=>{
    const token = req.header("x-token");
    if(!token){
        return res.status(401).json({
            msg:"There is no token in the request."
        });
    }
    try {
        //verificacion de token
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        //leer el usuerio con el id de token
        const user= await User.findById(uid);
        //verificar que existe el usuario
        if(!user){
            return res.status(401).json({
                msg:"The user does not exist in the database."
            })
        }
        req.user=user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:"No valid token"
        });
    }
}
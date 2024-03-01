import bcryptjs from "bcryptjs";
import User from "../users/user.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const login = async (req, res) => {
    const { user, password } = req.body;
    try {
        const userLog = await User.findOne({
            $or: [{ username: user }, { userEmail: user }]
        });
        //verifico que el usuario existe
        if (!userLog) {
            res.status(400).json({
                msg: "Username or email are not valid"
            });
        } else{
            //verifico que la clave del usuario sea igual
            const verifyPassword = bcryptjs.compareSync(password, userLog.password);
            if (!verifyPassword) {
                res.status(400).json({
                    msg: "Password is incorrect"
                });
            }
            const token = await generateJWT(userLog.id);
            res.status(200).json({
                msg: "YOU ARE LOGGED IN THE APP",
                userLog,
                token
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Contact administrator"
        });
    }
}
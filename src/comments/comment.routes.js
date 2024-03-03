import { Router } from "express";
import { check } from "express-validator";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { commentsGet } from "./comment.controller.js";

const router = Router();

router.get('/',[validateJWT],commentsGet);

export default router;
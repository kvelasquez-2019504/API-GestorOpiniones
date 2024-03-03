import { Router } from "express";
import { check } from "express-validator";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { commentPost,
    commentPut,
    commentsGet, 
    verifyComment} from "./comment.controller.js";

import { validateFields } from "../middlewares/validate-field.js";
import { existPublication } from "../helpers/db-validator.js";

const router = Router();

router.get('/',[validateJWT],commentsGet);

router.put('/:idComment',[
    validateJWT,
    verifyComment,
    check('comment','The comment is required to publicate comment').not().isEmpty(),
    validateFields
],commentPut);

router.post('/',[
    validateJWT,
    check('comment','The comment is required to publicate comment').not().isEmpty(),
    check('idPublication','A mongo ID is required').isMongoId(),
    check('idPublication').custom(existPublication),
    validateFields
],commentPost);

export default router;
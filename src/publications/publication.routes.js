import { Router } from "express";
import { check } from "express-validator";
import { publicationGet,
    publicationPost,
    verifyIdPublication,
    publicationPut } from "./publication.controller.js";
import {verifyLengthCategory}  from '../helpers/db-validator.js';
import { validateFields } from "../middlewares/validate-field.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router= Router();

router.get('/',[validateJWT],publicationGet);

router.delete('/:idPublication',[validateJWT],)

router.put('/:idPublication',[validateJWT,
    verifyIdPublication,
    check('category').custom(verifyLengthCategory),
    check('title','The title of publication is required').not().isEmpty(),
    check('mainText','The main text is required for publication').not().isEmpty(),
    check('category','Required minimum one the category of publication in form array').isArray().not().isEmpty(),
    validateFields
],publicationPut);

router.post('/',[validateJWT,
    check('title','The title of publication is required').not().isEmpty(),
    check('mainText','The main text is required for publication').not().isEmpty(),
    check('category','Required minimum one the category of publication in form array').isArray().not().isEmpty(),
    check('category').custom(verifyLengthCategory),
    validateFields
],publicationPost);

export default router;

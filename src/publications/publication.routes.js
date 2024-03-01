import { Router } from "express";
import { check } from "express-validator";
import { publicationPost } from "./publication.controller.js";
import { validateFields } from "../middlewares/validate-field.js";

const router= Router();
router.post('/',[
    validateFields
],publicationPost);
export default router;

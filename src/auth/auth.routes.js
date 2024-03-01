import { Router } from "express";
import { check } from "express-validator";
import { login } from "./auth.controller.js";
import { validateFields } from "../middlewares/validate-field.js";

const router = Router();

router.post('/',[
    check("user","Username or email is required").not().isEmpty(),
    check("password","Password is required for the logging").not().isEmpty(),
    validateFields
],login);

export default router;
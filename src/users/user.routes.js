import {Router} from 'express'; 
import {check} from 'express-validator';
import {existsUsername,existsUserEmail} from '../helpers/db-validator.js';
import {validateField} from '../middlewares/validate-field.js'
import {userPost} from './user.controller.js';
const router = Router();

router.post('/',[
    check("username","Name is required to register").not().isEmpty(),
    check("username").custom(existsUsername),
    check("userEmail","A valid email is required").isEmail(),
    check('userEmail').custom(existsUserEmail),
    check("password","The password is mandatory for security").isLength({min:8}),
    validateField
],userPost);

export default router; 
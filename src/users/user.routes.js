import {Router} from 'express'; 
import {check} from 'express-validator';
import {existsUsername,verifyPassword,
    existsUserEmail} from '../helpers/db-validator.js';
import {validateFields} from '../middlewares/validate-field.js';
import {validateJWT} from '../middlewares/validate-jwt.js';
import {userPut,userPost} from './user.controller.js';
const router = Router();

router.put('/',[validateJWT,
    check("username","The username is required").not().isEmpty(),
    check("username").custom(existsUsername),
    check("passwordOld").custom(verifyPassword),
    check("password","The password is mandatory for security and with minimum 8 characters").isLength({min:8}),
    validateFields
],userPut);

router.post('/',[
    check("username","Name is required to register").not().isEmpty(),
    check("username").custom(existsUsername),
    check("userEmail","A valid email is required").isEmail(),
    check('userEmail').custom(existsUserEmail),
    check("password","The password is mandatory for security and with minimum 8 characters").isLength({min:8}),
    validateFields
],userPost);

export default router; 
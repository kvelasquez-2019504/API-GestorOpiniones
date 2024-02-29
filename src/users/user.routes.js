import {Router} from 'express'; 
import {check} from 'express-validator';
import {validarCampos} from '../middlewares/validar-campos.js'
import {usuariosPost} from '../users/user.controller.js';
const router = Router();

router.post('/',[
    check("nombreUser","El nombre es obligatorio para registrarse").not().isEmpty(),
    check("correoUser","Es obligatorio un correo válido").isEmail(),
    check("password","La clave es obligatoria por seguridad").isLength({min:8}),
    validarCampos
],usuariosPost);

export default router; 
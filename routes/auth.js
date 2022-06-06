/*
    path: '/api/login'

*/


const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleLogin, validarToken  } = require('../controllers/auth');
const { siEsEmail } = require('../middlewares/validacionesInternas');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');


const router = Router();

router.post( '/',
    [
        siEsEmail,
        check('emailusu', 'El email es obligatorio').isEmail(),
        check('pass', 'La Contraseña es Obligatoria').not().isEmpty(),
        validarCampos
    ],
    login);

    router.post( '/google',
    [
        check('token', 'El Token de Google es Obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleLogin);

    // vamos a validar si el Token es correcto o validamos si expiro ?
    router.get( '/validar', validarJWT ,   validarToken);





module.exports = router;
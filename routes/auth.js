/*
    path: '/api/login' Login generado para los Usuario de la Aplicacion
    path: '/api/logn' Login Generado para los Colaboradores registrados por Enterprice
    path: '/api/lgn' Login Usado por el Area de Administracion de GoodLooking
    path: '/api/google' Login Usado por Creacion de usuario desde Google.
    path: '/api/validar' Validamos el Token

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleLogin, bx, lmd } = require('../controllers/auth');
const { validateFields, isEmailLamed, isEmail, validateJWT, activeCola } = require('../middlewares/globalValidations');

const router = Router();

router.post('/', [
        isEmail,
        check('email', 'El email es obligatorio').isEmail(),
        check('pass', 'La Contraseña es Obligatoria').not().isEmpty(),
        validateFields
    ],
    login);
router.post('/bx', [
        isEmail, activeCola,
        check('email', 'El email es obligatorio').isEmail(),
        check('pass', 'La Contraseña es Obligatoria').not().isEmpty(),
        validateFields
    ],
    bx);

router.post('/lmd', [
        check('email', 'El email es obligatorio').isEmail(),
        check('pass', 'La Contraseña es Obligatoria').not().isEmpty(),
        validateFields
    ],
    lmd);

router.post('/google', [
        check('token', 'El Token de Google es Obligatorio').not().isEmpty(),
        validateFields
    ],
    googleLogin);

// vamos a validar si el Token es correcto o validamos si expiro ?
//router.get('/validar', validateJWT, validarToken);





module.exports = router;
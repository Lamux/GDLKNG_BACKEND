/*  
    RUTA: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');

const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuarios, borrarUsuario } = require('../controllers/usuarios');
const { esVerdadero } = require('../middlewares/aceptaTerminos');


const router = Router();

//validarJWT
router.get('/', getUsuarios);
router.post('/', [
        esVerdadero,
        check('nomusu', 'El campo Nombre es Obligatorio').not().isEmpty(),
        check('apeusu', 'El campo Apellido es Obligatorio').not().isEmpty(),
        check('celusu', 'El campo Celular es Obligatorio').not().isEmpty(),
        check('emailusu', 'El campo Email es Obligatorio').isEmail(),
        check('pass', 'El campo Contraseña es Obligatorio').not().isEmpty(),
        check('terminosusu', 'Aceptar los terminos es Obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearUsuario);

router.put('/:id', [
    validarJWT,
    check('nomusu', 'El campo Nombre es Obligatorio').not().isEmpty(),
    check('apeusu', 'El campo Apellido es Obligatorio').not().isEmpty(),
    check('celusu', 'El campo Celular es Obligatorio').not().isEmpty(),
    check('emailusu', 'El campo Email es Obligatorio').isEmail(),
    check('rolusu', 'El campo Rol es Obligatorio').not().isEmpty(),
    validarCampos,
], actualizarUsuarios);

router.delete('/:id', validarJWT, borrarUsuario);


module.exports = router;
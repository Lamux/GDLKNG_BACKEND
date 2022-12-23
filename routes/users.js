/*  
    RUTA: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { lamed, validateFields, acceptTerms, isEmail, validateJWT } = require('../middlewares/globalValidations');
const { viewUser, createUser, updateUser, deleteUser } = require('../controllers/users');




const router = Router();

//validarJWT
router.get('/', viewUser);
router.post('/', [
        acceptTerms,
        check('name', 'El campo Nombre es Obligatorio').not().isEmpty(),
        check('lastName', 'El campo Apellido es Obligatorio').not().isEmpty(),
        check('movil', 'El campo Celular es Obligatorio').not().isEmpty(),
        check('email', 'El campo Email es Obligatorio').isEmail(),
        check('pass', 'El campo Contraseña es Obligatorio').not().isEmpty(),
        check('terms', 'Aceptar los terminos es Obligatorio').not().isEmpty(),
        validateFields,
        isEmail,
    ],
    createUser);

router.put('/:id', [
    validateJWT,
    check('name', 'El campo Nombre es Obligatorio').not().isEmpty(),
    check('lastName', 'El campo Apellido es Obligatorio').not().isEmpty(),
    check('movil', 'El campo Celular es Obligatorio').not().isEmpty(),
    check('email', 'El campo Email es Obligatorio').isEmail(),
    check('role', 'El campo Rol es Obligatorio').not().isEmpty(),
    validateFields,
], updateUser);

router.delete('/:id', [validateJWT, lamed], deleteUser);


module.exports = router;
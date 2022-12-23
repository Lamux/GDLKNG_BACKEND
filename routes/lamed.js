/*   
    Ruta: /api/lmd
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { lamed, validateJWT } = require('../middlewares/globalValidations');

const {
    viewLamed,
    createLamed,
    updateLamed,
    deleteLamed,
} = require('../controllers/lamed');

const router = Router();

// CONSULTAR TODOS LAMED
router.get('/', [validateJWT, lamed], viewLamed);

// CREAR LAMED
router.post('/', [
    lamed,
    check('name', 'El Nombre del Local es Necesario').not().isEmpty(),
    check('lastName', 'El NIT del Local es Obligatorio').not().isEmpty(),
    check('document', 'El Email del Local es Obligatorio').not().isEmpty(),
    check('movil', 'El Email del Local es Obligatorio').not().isEmpty(),
    check('email', 'El Email del Local es Obligatorio').not().isEmpty(),
    check('pass', 'El Email del Local es Obligatorio').not().isEmpty(),
], createLamed);

// ACTUALIZAR LAMED
router.put('/:id', [
    validateJWT, lamed,
    check('name', 'El Nombre del Rol es Necesario').not().isEmpty(),
    check('lastName', 'El Apellido del Rol es Obligatorio').not().isEmpty(),
    check('document', 'El Documento del es Obligatorio').not().isEmpty(),
    check('role', 'El Rol es Obligatorio').not().isEmpty(),
    check('status', 'el Estado es Obligatorio').not().isEmpty(),

], updateLamed);

// TODO: BORRAR SALONES se debe parametrizar para que solo el Perfil Lamed pueda borrar Establecimientos
router.delete('/:id', [validateJWT, lamed, ], deleteLamed);


module.exports = router;
/*   
    Ruta: /api/local
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { viewBusiness, createBusiness, updateBusiness, deleteBusiness } = require('../controllers/business');
const { validateJWT, lamed, validateFields, validateService, validateTypeServices, validateBusiness } = require('../middlewares/globalValidations');

const router = Router();
// CONSULTAR TODOS LOS SALONES
router.get('/', [validateJWT, lamed], viewBusiness);
// CREAR SALONES
router.post('/', [
    validateJWT, lamed,
    check('businessName', 'El Nombre del Local es Necesario').not().isEmpty(),
    check('nit', 'El NIT del Local es Obligatorio').not().isEmpty(),
    check('email', 'El Email del Local es Obligatorio').isEmail(),
    check('address', 'La Dirección del Local es Obligatorio').not().isEmpty(),
    check('services', 'Los Servicios del Salon son Obligatorio').isMongoId(),
    check('typeServices', 'Los tipo de Servicios del Salon son Obligatorio').isMongoId(),
    validateFields, validateService, validateTypeServices,
], createBusiness);
// ACTUALIZAR SALONES
router.put('/:id', [
    validateJWT, lamed,
    check('businessName', 'El Nombre del Local es Necesario').not().isEmpty(),
    check('email', 'El Email del Local es Obligatorio').isEmail(),
    check('address', 'La Dirección del Local es Obligatorio').not().isEmpty(),
    check('services', 'Los Servicios del Salon son Obligatorio').isMongoId(),
    check('typeServices', 'Los tipo de Servicios del Salon son Obligatorio').isMongoId(),
    validateFields, validateService, validateTypeServices,
], updateBusiness);
// BORRAR SALONES se debe parametrizar para que solo el Usuario Lamed pueda borrar Establecimientos
router.delete('/:id', [validateJWT, lamed, ], deleteBusiness);


module.exports = router;
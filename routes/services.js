/*   
    Ruta: /api/servicio
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { viewServices, createServices, updateServices, deleteServices } = require('../controllers/services');
const { lamed, validateJWT, validateFields } = require('../middlewares/globalValidations');



const router = Router();

router.get('/', [validateJWT, lamed], viewServices);

router.post('/', [
    validateJWT, lamed,
    check('name', 'El Nombre del Servicio es Obligatorio').not().isEmpty(),
    validateFields
], createServices);

router.put('/:id', [
    validateJWT, lamed,
    check('name', 'El Nombre del Servicio es Obligatorio').not().isEmpty(),
    validateFields
], updateServices);

router.delete('/:id', [validateJWT, lamed, ], deleteServices);


module.exports = router;
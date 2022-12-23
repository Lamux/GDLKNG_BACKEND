/*   
    Ruta: /api/tipo-servi
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { viewTSV, createTSV, updateTSV, deleteTSV } = require('../controllers/typeServices');
const { validateJWT, lamed, owner, manager, validateFields } = require('../middlewares/globalValidations');

const router = Router();

router.get('/', [validateJWT, lamed], viewTSV);

router.post('/', [
    validateJWT, lamed,
    check('serviceName', 'El Servicio es Obligatorio').isMongoId(),
    check('typeService', 'El Tipo de Servicio es Obligatorio').not().isEmpty(),
    validateFields
], createTSV);

router.put('/:id', [
    validateJWT, lamed,
    check('serviceName', 'El Servicio es Obligatorio').isMongoId(),
    check('typeService', 'El Tipo de Servicio es Obligatorio').not().isEmpty(),
    validateFields
], updateTSV);

router.delete('/:id', [validateJWT, lamed], deleteTSV);


module.exports = router;
/*   
    Ruta: /api/st
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { viewST, createST, updateST, deleteST } = require('../controllers/staffType');
const { validateJWT, lamed, owner, manager, validateFields } = require('../middlewares/globalValidations');


const router = Router();

router.get('/', [validateJWT, lamed], viewST);

router.post('/', [
    validateJWT, lamed,
    check('service', 'El Tipo de Servicio es Obligatorio').isMongoId(),
    check('name', 'El Tipo de Staff es Obligatorio').not().isEmpty(),
    validateFields
], createST);

router.put('/:id', [
    validateJWT, lamed,
    check('service', 'El Tipo de Servicio es Obligatorio').isMongoId(),
    check('name', 'El Tipo de Staff es Obligatorio').not().isEmpty(),
    validateFields
], updateST);

router.delete('/:id', [validateJWT, lamed], deleteST);


module.exports = router;
/*   
    Ruta: /api/staff
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { lamed, validateFields, validateJWT, owner, manager, validateStaff } = require('../middlewares/globalValidations');
const { viewStaff, createStaff, updateStaff, deleteStaff } = require('../controllers/staff');


const router = Router();

router.get('/', [
    validateJWT, (lamed || owner || manager),
], viewStaff);

router.post('/', [validateJWT, (lamed || owner || manager),
    check('owner', 'El Nombre del Servicio es Obligatorio').isMongoId(),
    check('document', 'El Nombre del Servicio es Obligatorio').not().isEmpty(),
    validateFields
], createStaff);

router.put('/:id', [
    validateJWT, (lamed || owner || manager),
    check('staff', 'lala').isMongoId(),
    check('role', 'lalala').isMongoId(),
    check('staffType', 'lalala').isMongoId(),
    validateFields, validateStaff
], updateStaff);

router.delete('/:id', [validateJWT, lamed, ], deleteStaff);


module.exports = router;
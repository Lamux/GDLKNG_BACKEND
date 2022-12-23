/*   
    Ruta: /api/owner
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { lamed, validateFields, validateJWT } = require('../middlewares/globalValidations');

const {
    viewOwner,
    createOwner,
    updateOwner,
    deleteOwner,
} = require('../controllers/owner');

const router = Router();

router.get('/', [validateJWT, lamed], viewOwner);

router.post('/', [validateJWT, lamed,
    check('owner', 'El Nombre del Servicio es Obligatorio').isMongoId(),
    check('document', 'El Nombre del Servicio es Obligatorio').not().isEmpty(),
    check('role', 'El Rol es Obligatorio').isMongoId(),
    validateFields
], createOwner);

router.put('/:id', validateJWT, lamed, updateOwner);

router.delete('/:id', [validateJWT, lamed, ], deleteOwner);





module.exports = router;
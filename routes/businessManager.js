/*   
    Ruta: /api/adminloc
*/
const { Router } = require('express');
const { check } = require('express-validator');
const {
    validateJWT,
    validateFields,
    lamed,
    owner,
    validateBusiness,
    validateUserForManager
} = require('../middlewares/globalValidations');
const { viewBS, createBS, updateBS, deleteBS } = require('../controllers/businessManager');


const router = Router();

router.get('/', [validateJWT, (lamed || owner)], viewBS);

router.post('/', [
    validateJWT, (lamed || owner),
    check('manager', 'El Administrador es Necesario').isMongoId(),
    check('document', 'El Local es Necesario').not().isEmpty(),
    check('role', 'El Local es Necesario').isMongoId(),
    check('typeCollaborator', 'El Local es Necesario').isMongoId(),
    check('nit', 'El Local es Necesario').not().isEmpty(),
    check('business', 'El Local es Necesario').isMongoId(),
    validateFields, validateBusiness, validateUserForManager
], createBS);

router.put('/:id', [validateJWT, (lamed || owner), ], updateBS);

router.delete('/:id', [validateJWT, (lamed || owner), ], deleteBS);


module.exports = router;
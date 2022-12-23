/*   
    Ruta: /api/colaborador
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { viewCollaborator, createCollaborator, updateCollaborator, deleteCollaborator } = require('../controllers/collaborator');
const { validateJWT, lamed, owner, manager, validateFields, validateBusiness, validateUserForCollaborator } = require('../middlewares/globalValidations');


const router = Router();

router.get('/', [validateJWT, (lamed || owner || manager)], viewCollaborator);

router.post('/', [
    validateJWT, (lamed || owner || manager),
    check('collaborator', 'El Colaborador es Obligatorio').isMongoId(),
    check('document', 'El Documento es Obligatorio').not().isEmpty(),
    check('role', 'El Rol es Obligatorio').isMongoId(),
    check('typeCollaborator', 'El Tipo de Colaborador es Obligatorio').isMongoId(),
    check('nit', 'La Asignacion de Servicios es Obligatorio').not().isEmpty(),
    validateFields, validateBusiness, validateUserForCollaborator
], createCollaborator);

router.put('/:id', [
    // validar si los datos del usuario se actualizan desde el Usuario
    // aqui solo Actualizamos los datos correspondientes al Establecimiento
    validateJWT, (lamed || owner || manager),
    check('nit', 'La Asignacion de Servicios es Obligatorio').not().isEmpty(),
    check('role', 'El Rol es Obligatorio').isMongoId(),
    check('typeCollaborator', 'El Tipo de Colaborador es Obligatorio').isMongoId(),
    validateFields
], updateCollaborator);

router.delete('/:id', validateJWT, (lamed || owner || manager), deleteCollaborator);


module.exports = router;
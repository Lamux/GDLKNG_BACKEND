/*   
    Ruta: /api/tipcolabora
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { viewTC, createTC, updateTC, deleteTC } = require('../controllers/typeCollaborator');
const { validateFields, validateJWT, lamed, owner, manager } = require('../middlewares/globalValidations');


const router = Router();

router.get('/', [validateJWT, (lamed || owner || manager)], viewTC);

router.post('/', [
    validateJWT, (lamed || owner || manager),
    check('name', 'El Tipo de Colaborador es Obligatorio').not().isEmpty(),
    validateFields
], createTC);

router.put('/:id', [validateJWT, (lamed || owner || manager)], updateTC);

router.delete('/:id', [validateJWT, (lamed || owner || manager)], deleteTC);


module.exports = router;
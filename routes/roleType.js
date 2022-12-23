/*  
    RUTA: /api/tiporol
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { viewTR, createTR, updateTR, deleteTR } = require('../controllers/roleType');
const { lamed, validateJWT } = require('../middlewares/globalValidations');


const router = Router();


//validarJWT
router.get('/', validateJWT, lamed, viewTR);

router.post('/', [
    validateJWT, lamed,
    check('name', 'El Tipo de Rol es Obligatorio').not().isEmpty(),
    check('category', 'La Categoria es Obligatorio').not().isEmpty(),

], createTR);

router.put('/:id', [
    validateJWT, lamed,
    check('name', 'El Tipo de Rol es Obligatorio').not().isEmpty(),
    check('category', 'La Categoria es Obligatorio').not().isEmpty(),
], updateTR);

router.delete('/:id', [validateJWT, lamed], deleteTR);

module.exports = router;
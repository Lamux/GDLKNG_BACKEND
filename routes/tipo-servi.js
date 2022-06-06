/*   
    Ruta: /api/tipo-servi
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const { gettipservi, creartipservi,actualizatipservi,
        borrartipservi, } = require('../controllers/tiposervi');

const router = Router();

router.get( '/',validarJWT,gettipservi );

router.post( '/',
    [
        validarJWT,
        check('servi','El Servicio es Obligatorio').isMongoId(),
        check('tiposervi','El Tipo de Servicio es Obligatorio').not().isEmpty(),
        validarCampos
    ], creartipservi );

router.put( '/:id',
    [
        validarJWT,
        check('servi','El Servicio es Obligatorio').isMongoId(),
        check('tiposervi','El Tipo de Servicio es Obligatorio').not().isEmpty(),
        validarCampos
    ],  actualizatipservi );

router.delete( '/:id', borrartipservi );


module.exports = router;
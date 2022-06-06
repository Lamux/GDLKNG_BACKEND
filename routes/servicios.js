/*   
    Ruta: /api/servicio
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const { getservicios, crearservicios, actualizaservicios, 
        borrarservicios } = require('../controllers/servicios');

const router = Router();

router.get( '/',validarJWT,getservicios );

router.post( '/',
    [
        validarJWT,
        check('nomservi','El Nombre del Servicio es Obligatorio').not().isEmpty(),
        validarCampos
    ], crearservicios );

router.put( '/:id',
    [
        validarJWT,
        check('nomservi','El Nombre del Servicio es Obligatorio').not().isEmpty(),
        validarCampos
    ], actualizaservicios );

router.delete( '/:id',validarJWT, borrarservicios );


module.exports = router;
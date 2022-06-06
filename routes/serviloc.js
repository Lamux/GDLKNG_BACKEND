/*   
    Ruta: /api/serviloc
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const { getserviloc, crearserviloc, actualizaserviloc, 
        borrarserviloc } = require('../controllers/serviloc');
const { validaEstablecimiento, validarServicio, validarColaborador, validarServicioLocal } = require('../middlewares/validacionesInternas');

const router = Router();

router.get( '/',validarJWT,getserviloc );

router.post( '/',
    [
        validarJWT,
        validaEstablecimiento,
        validarColaborador,
        validarServicio,
        validarServicioLocal,
        check('local', 'El campo Local no puede esta vacio').isMongoId(),
        check('serviloc', 'El campo Servicio no puede esta vacio').isMongoId(),
        check('tipservi', 'El campo tipservi no puede esta vacio').isMongoId(),
        check('timeserviloc', 'El campo timeservilos no puede esta vacio').not().isEmpty(),
        check('tmpbioseguridad', 'El campo tmpbioseguridad no puede esta vacio').not().isEmpty(),
        check('vlserviloc', 'El campo vlserviloc no puede esta vacio').not().isEmpty(),
        check('colaboserviloc', 'El campo colaboserviloc no puede esta vacio').isMongoId(),
        check('vlcolaboserviloc', 'El campo vlcolaboserviloc no puede esta vacio').not().isEmpty(),
        validarCampos
    ], crearserviloc );

router.put( '/:id',
[
    validarJWT,
    validaEstablecimiento,
    validarColaborador,
    validarServicio,
    validarServicioLocal,
    check('local', 'El campo Local no puede esta vacio').isMongoId(),
    check('serviloc', 'El campo Servicio no puede esta vacio').isMongoId(),
    check('tipservi', 'El campo tipservi no puede esta vacio').isMongoId(),
    check('timeserviloc', 'El campo timeservilos no puede esta vacio').not().isEmpty(),
    check('tmpbioseguridad', 'El campo tmpbioseguridad no puede esta vacio').not().isEmpty(),
    check('vlserviloc', 'El campo vlserviloc no puede esta vacio').not().isEmpty(),
    check('colaboserviloc', 'El campo colaboserviloc no puede esta vacio').isMongoId(),
    check('vlcolaboserviloc', 'El campo vlcolaboserviloc no puede esta vacio').not().isEmpty(),
    validarCampos
], actualizaserviloc );

router.delete( '/:id',[validarJWT], borrarserviloc );


module.exports = router;
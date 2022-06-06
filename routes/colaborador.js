/*   
    Ruta: /api/colaborador
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const { getcolaborador, crearcolaborador,actualizacolaborador,
        borrarcolaborador, } = require('../controllers/colaborador');

const router = Router();

router.get( '/',validarJWT,getcolaborador );

router.post( '/',
    [
        validarJWT,
        check('colabo','El Colaborador es Obligatorio').isMongoId(),
        check('local','El Dato del Local es Obligatorio').isMongoId(),
        check('servicola','La Asignacion de Servicios es Obligatorio').isMongoId(),
        validarCampos
    ], crearcolaborador );

router.put( '/:id',[
    // validar si los datos del usuario se actualizan desde el Usuario
    // aqui solo Actualizamos los datos correspondientes al Establecimiento
    validarJWT,
    check('local','El Dato del Local es Obligatorio').isMongoId(),
    check('servicola','La Asignacion de Servicios es Obligatorio').isMongoId(),
    check('estacolab','El Estado del Colaborador es Obligatorio'),
    validarCampos
    ], actualizacolaborador );

router.delete( '/:id',validarJWT, borrarcolaborador );


module.exports = router;
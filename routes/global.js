/*   
    Ruta: /api/global
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const { getglobal, crearglobal,actualizaglobal,
        borrarglobal, } = require('../controllers/global');
const { validarGlobal } = require('../middlewares/validacionesInternas');

const router = Router();

router.get( '/',getglobal );

router.post( '/',
    [
        validarJWT,
        validarGlobal,
        check('globuser','El Administrador es Necesario').isMongoId(),
        check('local','El Local es Necesario').isMongoId(),
        check('tipcolabora','El Tipo de Colaborador es Requerido').isMongoId(),
        validarCampos,
    ], crearglobal );

router.put( '/:id',
[
    validarJWT,
    
], actualizaglobal );

router.delete( '/:id', borrarglobal );


module.exports = router;
/*   
    Ruta: /api/adminloc
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const { getadminloc, crearadminloc,actualizaadminloc,
        borraradminloc, } = require('../controllers/adminloc');

const router = Router();

router.get( '/',validarJWT,getadminloc );

router.post( '/',
    [
        validarJWT,
        check('admin','El Administrador es Necesario').not().isEmpty(),
        check('local','El Local es Necesario').not().isEmpty(),
        validarCampos,
    ], crearadminloc );

router.put( '/:id', actualizaadminloc );

router.delete( '/:id', borraradminloc );


module.exports = router;
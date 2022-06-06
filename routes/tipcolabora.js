/*   
    Ruta: /api/tipcolabora
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const { gettipcolabora, creartipcolabora,actualizatipcolabora,
        borrartipcolabora, } = require('../controllers/tipocolabora');

const router = Router();

router.get( '/',validarJWT,gettipcolabora );

router.post( '/',
    [
        validarJWT,
        check('tipcolabora','El Tipo de Colaborador es Obligatorio').not().isEmpty(),
        validarCampos
    ], creartipcolabora );

router.put( '/:id', actualizatipcolabora );

router.delete( '/:id', borrartipcolabora );


module.exports = router;
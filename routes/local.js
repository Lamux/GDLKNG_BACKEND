/*   
    Ruta: /api/local
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const { getlocal, crearlocal, actualizalocal, borrarlocal } = require('../controllers/local');

const router = Router();
// CONSULTAR TODOS LOS SALONES
router.get( '/',validarJWT,getlocal );
// CREAR SALONES
router.post( '/',
    [
        validarJWT,
        check('nomloc','El Nombre del Local es Necesario').not().isEmpty(),
        check('nitloc', 'El NIT del Local es Obligatorio').not().isEmpty(),
        check('emailoc', 'El Email del Local es Obligatorio').isEmail(),
        check('dirloc', 'La Direccion del Local es Obligatorio').not().isEmpty(),
        check('servicios', 'Los Servicios del Salon son Obligatorio').not().isEmpty(),
        validarCampos,
    ], crearlocal );
// ACTUALIZAR SALONES
router.put( '/:id',[
    validarJWT,
    check('nomloc','El Nombre del Local es Necesario').not().isEmpty(),
    check('emailoc', 'El Email del Local es Obligatorio').isEmail(),
    check('dirloc', 'La Direccion del Local es Obligatorio').not().isEmpty(),
    check('servicios', 'Los Servicios del Salon son Obligatorio').not().isEmpty(),
    validarCampos,
], actualizalocal );
// BORRAR SALONES se debe parametrizar para que solo el Usuario Lamed pueda borrar Establecimientos
router.delete( '/:id',validarJWT, borrarlocal );


module.exports = router;
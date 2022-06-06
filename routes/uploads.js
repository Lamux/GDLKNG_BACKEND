/*   
    Ruta: /api/uploads
*/

const { Router } = require('express');
const efileUpload = require('express-fileupload');
const { fileUpload, retornaImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();

router.use( efileUpload() );


router.put('/:tipo/:id',validarJWT , fileUpload);

router.get('/:tipo/:foto',validarJWT , retornaImagen);


module.exports = router;
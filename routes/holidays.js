/*   
    Ruta: /api/hds
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { viewHolaiday,createHolaiday,updateHolaiday,deleteHolaiday  } = require('../controllers/holidays');
const { validateJWT, lamed } = require('../middlewares/globalValidations');



const router = Router();


router.get('/', [validateJWT, lamed], viewHolaiday);
router.post('/', [
    validateJWT, lamed,
    check('date', 'La fecha es Necesario').not().isEmpty(),
    check('nameDay', 'El Nombre del dia Feriado es Necesario').not().isEmpty()
],createHolaiday);
router.put('/', [validateJWT, lamed], updateHolaiday);
router.delete('/', [validateJWT, lamed], deleteHolaiday);



module.exports = router;
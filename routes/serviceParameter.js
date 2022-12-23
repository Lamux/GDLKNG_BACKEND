/*   
    Ruta: /api/sp
*/



const { Router } = require('express');
const { check } = require('express-validator');
const { get } = require('mongoose');
const { viewServiceparam, CreateServiceparam, updateServiceparam, deleteServiceparam, updateServices } = require('../controllers/serviceParameter');
const { validateJWT, lamed, owner, manager, validateServiceAndBusiness, validateStaffType, validateRoles, isStaffBusiness, isStaffAndParameter } = require('../middlewares/globalValidations');

const router = Router();


router.get('/', [validateJWT, validateRoles,],viewServiceparam);
router.post('/', [
    validateJWT,validateRoles, 
    check('business', 'El Negocio es Obligatorio').isMongoId(),
    check('services', 'El servicio es Obligatorio').isMongoId(),
    check('typeServices', 'El Tipo de Servicio es Obligatorio').isMongoId(),
    check('staffType', 'El Tipo de Staff es Obligatorio').isMongoId(),
    check('serviceTime', 'El Tiempo del Servicio es Obligatorio').not().isEmpty(),
    check('biocleaning', 'El Tiempo de Biolimpieza Servicio es Obligatorio').not().isEmpty(),
    check('servicePrice', 'El Costo del Servicio es Obligatorio').not().isEmpty(),
    validateServiceAndBusiness,validateStaffType
],CreateServiceparam);

router.put('/ups',[
    validateJWT,validateRoles,
    check('business', 'El Negocio es Obligatorio').isMongoId(),
    check('staff', 'El Staff es Obligatorio').isMongoId(),
    check('servicesParameter', 'El Parametro del Servicio es Obligatorio').isMongoId(),
    check('servicePrice', 'El porcentaje del Servicio es Obligatorio').not().isEmpty(),
    isStaffBusiness,isStaffAndParameter
],updateServices);
router.put('/', [validateJWT, (lamed || owner || manager)],updateServiceparam);
router.delete('/', [validateJWT, (lamed || owner || manager)],deleteServiceparam);



module.exports = router;
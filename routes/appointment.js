/*   
    Ruta: /api/app
*/



const { Router } = require('express');
const { check } = require('express-validator');
const { viewAppointment, createAppointment, updateAppointment, deleteAppointment, createAppointments } = require('../controllers/appointment');
const { ExistsUser,ExistsBusiness, ExistsStaffInBusiness, UserSameDate } = require('../middlewares/globalControls');
const { validateJWT } = require('../middlewares/globalValidations');
const { TimeControl, validationAndTimeControl, validRangeOfHours, validationAndTimeControlBusiness } = require('../middlewares/globalTime');

// TODO: Para hacer las diferetes validaciones se deben:
// Las validaciones que se realizan son en tiempo de ejecucion, para cargar la informacion pertinente
// Ej. El usuario selecciona el Business, luego se cargan los servicios de este Business,
// luego de escoger el servicio se cargan los Staff asignados, en este punto se valida el horario disponibles para cargarlos 
// y mostrarlos al usuario


const router = Router();

// para este punto se deben tener en cuenta las siguientes condiciones:
// TODO: El usuario crea un cita y el Manager tambien validar quien lo esta haciendo

router.get('/',[
    // Aqui se debe validar si es el usuario que esta solicitando los datos de su cita
    // El Manager igualmente puede validar las citas asignadas al Business

],viewAppointment);

router.post('/',[
    validateJWT,ExistsUser,ExistsBusiness,
    check('user', 'The User is required').isMongoId(),
    check('business', 'The Service is required').isMongoId(),
    check('services', 'The Service is required').isMongoId(),
    check('typeServices', 'The Staff Service is required').isMongoId(),
    check('staffServices', 'The Staff Service is required').isMongoId(),
    check('appointmentDate.dateService', 'The appointmentDate dateService is required').not().isEmpty(),
    check('appointmentDate.timeService', 'The appointmentDate timeService is required').not().isEmpty(),
    ExistsStaffInBusiness,validationAndTimeControl,validationAndTimeControlBusiness,
    validRangeOfHours,UserSameDate,    
],createAppointment);

// TODO: EL Usuario y el Manager puede editar las Citas
router.put('/',[
   
    
],updateAppointment);

// TODO: aqui se hace referencia el cancelar una cita NO eliminarla
router.delete('/',[
    
],deleteAppointment);


module.exports = router;
const { response } = require("express");
mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const { validationResult, Result } = require('express-validator');

const Lmd = require("../models/lamed");
const businessUsers = require("../models/businessUsers");
const services = require("../models/services");
const business = require("../models/business");
const users = require("../models/users");
const sf = require("../models/staff");
const typeServices = require("../models/typeServices");
const stafftype = require("../models/staffType");
const staff = require("../models/staff");
const servicesParameter = require("../models/servicesParameter");



const validateJWT = (req, res = response, next) => {

    // LEER EL TOKEN
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay Token en la Peticion'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        // pasamos el UID a la Request para que desde alli podamos validar el usuario.
        req.uid = uid;
        next();
    } catch (error) {

        return res.status(401).json({
            ok: false,
            msg: 'Zona Restringida'
        });
    }
};

const acceptTerms = (req, res = response, next) => {
    const terminosUsu = req.body.terminosusu;
    // console.log(terminosusu);
    //VALIDAMOS QUE EL CAMPO SOLO TENGA EL VALOR TRUE, PARA QUE SIGA HACIA LA BD
    if (terminosUsu == true) {
        next();
    } else {
        return res.status(400).json({
            ok: false,
            msg: 'Las Condiciones de Uso de la Plataforma deben ser Aceptadas ...'
        });
    }
};

const validateFields = (req, res = response, next) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }
    next();
};
const isEmail = (req, res = response, next) => {

    const email = req.body.email;
    const emailValido = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{3,63}\.){1,125}[A-Z]{2,63}$/i;

    if (emailValido.test(email)) {
        next();
    } else {
        return res.status(400).json({
            ok: false,
            msg: 'El Email es incorrecto en su forma'
        });
    }
};
const isEmailLamed = (req, res = response, next) => {

    const email = req.body.email;
    const emailValido = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{3,63}\.){1,125}[A-Z]{2,63}$/i;

    if (emailValido.test(email)) {
        next();
    } else {
        return res.status(400).json({
            ok: false,
            msg: 'El Email es incorrecto en su forma'
        });
    }
};


const validateUserForManager = async(req, res = response, next) => {
    const User = req.body.manager;

    const isManager = await users.find({ _id: User }).where('status').equals(true);

    if (!isManager) {
        return res.status(400).json({
            ok: false,
            msg: 'El Usuario No Existe o esta Inactivo ...'
        });
    }
    next();
};
const validateUserForCollaborator = async(req, res = response, next) => {
    const User = req.body.collaborator;

    const isManager = await users.find({ _id: User }).where('status').equals(true);

    if (!isManager) {
        return res.status(400).json({
            ok: false,
            msg: 'El Usuario No Existe o esta Inactivo ...'
        });
    }
    next();
};

const validateStaff = async(req, res = response, next) => {
    const Staff = req.body.staff;

    const ExistsStaff = await sf.find({ _id: Staff });
    // console.log(Staff);
    if (!ExistsStaff) {
        return res.status(400).json({
            ok: false,
            msg: 'El Staff No Existe, Valide Con el Administrador MW1 Service ...'
        });
    }
    next();
};

const validateService = async(req, res = response, next) => {
    const Business = req.body.services;

    for (i = 0; i < Business.length; i++) {
        const ExistsBusiness = await services.findById(Business[i]);
        //console.log(ExistsBusiness._id);
        if (!ExistsBusiness) {
            return res.status(400).json({
                ok: false,
                msg: 'El Servicio No Existe, Valide Con el Administrador MW1 Service ...' + Business[i]
            });
        }
    }
    // console.log('El Servicio Si existe :P', Business);
    next();
};

const validateTypeServices = async(req, res = response, next) => {
    const TypeServices = req.body.typeServices;

    for (i = 0; i < TypeServices.length; i++) {
        const ExistsTypeServices = await typeServices.findById(TypeServices[i]);
        //console.log(ExistsTypeServices.serviceName);
        if (!ExistsTypeServices) {
            return res.status(400).json({
                ok: false,
                msg: 'El Servicio No Existe, Valide Con el Administrador MW1 TypeServices ...' + TypeServices[i]
            });
        }
    }
    // console.log('El Servicio Si existe :P', TypeServices);
    next();
};

const validateServiceAndBusiness = async(req, res = response, next) => {
    const buss = req.body.business;
    const servi = mongoose.Types.ObjectId(req.body.services);
    const TService = mongoose.Types.ObjectId(req.body.typeServices);
    const staffTy = mongoose.Types.ObjectId(req.body.staffType);    

    const ServicesDB = await business.findById(buss,{services:1}).where({services:{$in:[servi]}});
    if(!ServicesDB){
        return res.status(400).json({
            ok: false,
            msg: 'El Business No Existe, Valide Con el Administrador MW2 TypeServices ...'
        });
    }
    const TypeService = await business.findById(buss).where({typeServices:{$in:[TService]}});
    if(!TypeService){
        return res.status(400).json({
            ok: false,
            msg: 'El Tipo de Servicio No Esta Asociado el Business, Valide Con el Administrador MW2 TypeServices ...'
        });
    }     
    next();
};

const validateStaffType = async(req, res = response, next) => {
    
    const servi = mongoose.Types.ObjectId(req.body.services);
    console.log(servi);
    const staffType = mongoose.Types.ObjectId(req.body.staffType);
    console.log(staffType);
    const staff = await stafftype.findById(staffType,{name:1}).where('services')
                                 .in([servi]);
    console.log(staff);
    
    if(!staff){
        return res.status(400).json({
            ok: false,
            msg: 'El Tipo de Staff no esta Asociado al Business ...'
        });
    } 
    next();
};

const validateRoles = async (req, res = response, next) => {
    let countID = 0;
    const uid = req.uid;
    const buss = req.body.business;

    const ServicesDB = await business.findById(buss,{nit:1});
    const busUser = await businessUsers.findById(uid,{status:1}).where('nit').in([ServicesDB.nit])
                                                      .where('status').equals(true)
                                                      .where('typeCollaborator').in('62d9a06069c8bd50e68f7b93','62d9a07d69c8bd50e68f7b96');
    if(busUser){
        countID = countID + 3;
    }else {
        countID = countID - 1;
    }    
    const lmdUser = await Lmd.findById(buss,{status:1}).where('status').equals(true);
    if(lmdUser){
        countID = countID + 3;
    }else {
        countID = countID - 1;
    }
    if(countID > 0){
        next();
    }else {
        return res.status(400).json({
            ok: false,
            msg: 'No se Reconoce con el Perfil para Realizar esta Operacion ...'
        });
    }
};

const isStaffBusiness = async( req, res = response, next) => {
    const uid = req.uid;
    const buss = req.body.business;
    const staf = req.body.staff;

    const ServicesDB = await business.findById(buss,{nit:1});
    
    const isStaff = await staff.findById(staf)
                               .where('nit').equals([ServicesDB.nit]);    
    if(!isStaff){
        return res.status(400).json({
            ok: false,
            msg: 'Control con Error, Valide el Business y el Staff ...'
        });
    }
    next();    
};

const isStaffAndParameter = async( req, res = response, next) => {
    let validation = 0;
    const uid = req.uid;
    const buss = req.body.business;
    const staf = mongoose.Types.ObjectId(req.body.staff);
    const parameter = req.body.servicesParameter;

    const ServicesDB = await business.findById(buss,{nit:1});
    if(ServicesDB) validation = validation + 1;

    const isStaff = await staff.findById(staf)
                               .where('nit').equals([ServicesDB.nit]); 
    if(isStaff) validation = validation + 1;

    const isParameter = await servicesParameter.findById(parameter)
                                               .where('business').equals([buss]);
    if(isParameter) validation = validation + 1;

    switch (validation) {
        case 0:
            return res.status(400).json({
                ok: false,
                msg: 'Control con Error, Valide Con el Administrador MDW10 ...'
            });
        case 1:
            return res.status(400).json({
                ok: false,
                msg: 'Control con Error, Valide Con el Administrador MDW11 ...'
            });
        case 2:
            return res.status(400).json({
                ok: false,
                msg: 'Control con Error, Valide Con el Administrador MDW12 ...'
            });
        case 3:
            next();
            break;
    }    
};

const isCollaborator = async(req, res = response, next) => {
    const idGlobal = req.uid;
    const isColla = await Globales.find({ globuser: idGlobal });
    if (isColla) {
        // console.log('El Colaborador Si existe :P');
        next();
    } else {
        // console.log('El Colaborador No existe ...');
        return res.status(400).json({
            ok: false,
            msg: 'Control con Error, Valide Con el Administrador MW1 ...'
        });
    }
};

const activeCola = async(req, res = response, next) => {
    const email = req.body.email;
    
    try {
        //TODO: realizar bien la consulta para validar si existe el usuario
        const activeUser = await businessUsers.find({email:email},{status:1,_id:-1});
        if(activeUser[0].status){
            next();
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'Error en el Usuario ...'
            });
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            error
        });
    }
};

const validateServiceBusiness = async(req, res = response, next) => {
    const idtipServiLocal = req.body.local + ' ' + req.body.serviloc + ' ' + req.body.tipservi + ' ' + req.body.colaboserviloc;
    const validaServiLocal = await Serviloc.find({ unicoserviloc: idtipServiLocal });
    if (validaServiLocal) {
        // console.log('El Servicio en el Local Si existe :P ...');
        return res.status(400).json({
            ok: false,
            msg: 'El Servicio en el Local Si existe :P, Valide Con el Administrador MW1 ...'
        });
    } else {
        // console.log('El Servicio en el Local NO existe');
        next();
    }
};

const validateBusiness = async(req, res = response, next) => {
    const idBusiness = req.body.nit;
    const ExistsBusiness = await business.find({ nit: idBusiness });
    if (ExistsBusiness) {
        //console.log('El Establecimiento Si existe :P', ExistsBusiness);
        next();
    } else {
        // console.log('El Establecimiento No existe ...');

        return res.status(400).json({
            ok: false,
            msg: 'El Establecimiento No Existe, Valide Con el Administrador MW1 ...' + idBusiness
        });
    }
};

// MDW PARA VALIDACION DE ROLES EN SERVICIO 
const lamed = async(req, res = response, next) => {
    const idGlobal = req.uid;

    try {
        const LamedDB = await Lmd.findById(idGlobal, { role: 1 });
        if (LamedDB.role !== 'LMD_ROLE') {
            return res.status(404).json({
                ok: false,
                msg: 'Houston Tenemos Problemas'
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Requiere Permisos para esta Operación'
        });
    }
};

// const collaborator = async(req, res = response, next) => {
//     const idGlobal = req.uid;

//     try {
//         const LamedDB = await Usuario.findById(idGlobal, { rolusu: 1 });
//         console.log(LamedDB.rolusu);
//         if (LamedDB.rolusu !== 'COLABODOR_ROLE') {
//             return res.status(404).json({
//                 ok: false,
//                 msg: 'Houston Tenemos Problemas Cola'
//             });
//         }
//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             ok: false,
//             msg: 'Error Inesperado Cola'
//         });
//     }
// };

const manager = async(req, res = response, next) => {
    const idGlobal = req.uid;

    try {
        const LamedDB = await businessUsers.findById(idGlobal, { role: 1 });
        // console.log(LamedDB.role);
        if (LamedDB.role !== 'MNGR_ROLE') {
            return res.status(404).json({
                ok: false,
                msg: 'Houston Tenemos Problemas AdminLoc'
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado AdminLoc'
        });
    }
};

const owner = async(req, res = response, next) => {
    const idGlobal = req.uid;

    try {
        const LamedDB = await businessUsers.findById(idGlobal, { role: 1 });
        // console.log(LamedDB.role);
        if (LamedDB.role !== 'WNR_ROLE') {
            return res.status(404).json({
                ok: false,
                msg: 'Houston Tenemos Problemas admin'
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado admin'
        });
    }
};

module.exports = {
    validateJWT,
    acceptTerms,
    validateFields,
    isEmail,
    isEmailLamed,
    validateUserForManager,
    validateUserForCollaborator,
    validateService,
    validateStaff,
    validateTypeServices,
    validateServiceAndBusiness,
    validateStaffType,
    activeCola,
    validateServiceBusiness,
    validateBusiness,
    isCollaborator,
    lamed,
    validateRoles,
    // collaborator,
    manager,
    owner,
    isStaffBusiness,
    isStaffAndParameter,
};
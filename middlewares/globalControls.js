const { response } = require('express');
const { DateTime, Settings, Info, Zone } = require("luxon");
const business = require('../models/business');
const staff = require('../models/staff');
const businessUsers = require('../models/businessUsers');
const Collaborator = require('../models/Collaborator');
const users = require('../models/users');
const appointment = require('../models/appointment');
const servicesParameter = require('../models/servicesParameter');

// Creating a date time object
let date = DateTime.local();
let now = DateTime.local().toMillis();
let currentTime = DateTime.now().toFormat('H');
let moment = DateTime.now().toFormat('D TT'); // tenemos el formato completo de la hora 19/12/2022 19:08:53



//const business = require('../models/');

const ExistsCollaborator = async(dato, next) => {
    const colla = dato;

    // console.log(colla);

    //const ExstsColla = await Collaborator
};
const ExistsUser = async(req, res = response, next) => {
    const uid = req.body.user;

    // console.log(uid);
    try {
        const UserDB = await users.findById(uid).where('status').equals(true);
        if (UserDB) {
            next();            
        }else {
            return res.status(418).json({
                ok: false,
                msg: 'Requiere Permisos para esta Operación MW-GC0'
            });
        }
    } catch (error) {
        // console.log(error);
        return res.status(418).json({
            ok: false,
            msg: 'Requiere Permisos para esta Operación MW-GC0'
        });
    }
};

const ExistsBusiness = async(req, res = response, next) => {
    const bus = req.body.business;
    const service = req.body.services;
    const typeServices = req.body.typeServices;

    // console.log(uid);
    try {
        const BusinessDB = await business.findById(bus)
                        .where('services').in([service])
                        .where('typeServices').in([typeServices])
                        .where('status').equals(true);

        // console.log(BusinessDB);
        
        if (BusinessDB) {
            next();            
        }else {
            return res.status(418).json({
                ok: false,
                //dat: uid,
                msg: 'Require Permissions for this Operation MW-GC0'
            });
        }
    } catch (error) {
        // console.log(error);
        return res.status(418).json({
            ok: false,
            msg: 'the business does not have that service MW-GC0'
        });
    }
};
const ExistsStaffInBusiness = async(req, res = response, next) => {
    const uid = req.body.user;
    const bus = req.body.business;
    const typeServices = req.body.typeServices;
    const service = req.body.services;
    const Staffservice = req.body.staffService;

    // console.log(Staffservice);
    try {
        try {
            const Staff = await staff.findById(Staffservice,{status:1} )
                                        .where('status').equals(true);
        } catch (error) {
            res.status(418).json({
                ok: false,
                //dat: uid,
                msg: 'Inactive Staff MW-GC0'
            });
        }
        
        const NitDB = await business.findById(bus)
                                    .where('status').equals(true)
                                    .where('typeServices').in([typeServices]); 
        
        // console.log(!NitDB);
        if (NitDB) {
            next();            
        }
        
    } catch (error) {
        console.log(error);
        res.status(418).json({
            ok: false,
            // dat: uid,
            msg: 'Require Permissions for this Operation MW-GC0'
        });
    }
};

const UserSameDate = async(req, res = response, next) => {
    const uid = req.uid;
    const Staffservice = req.body.staffService;
    const typeServices = req.body.typeServices;
    const dateAppoinment = req.body.dateService;
    const timeAppoinment = req.body.timeService;
    const h = DateTime.fromISO(timeAppoinment);

    

    // console.log(uid);
    try {
        const AppointmentDB = await appointment.find({'user.userID': uid})
                                            .where('appointmentDate.status').equals(true)                                            
                                            .where('appointmentDate.dateService').equals(dateAppoinment)
                                            .where('appointmentDate.timeService').equals(timeAppoinment);
        // validamos que el colaborador no tenga en un rango de tiempo una cita previa
        const appCollaborator = await servicesParameter.find({'typeServices':typeServices},
                                {business:1,typeServices:1,staffType:1,serviceTime:1,biocleaning:1,servicePrice:1,_id:0})
                                .where('status').equals(true);
        //TODO: validar que el Colaborador No tenga esa hora asignada
        const collaValidation = await appointment.find({'staffServices.staff': Staffservice})
                                            .where('appointmentDate.status').equals(true)
                                            .where('appointmentDate.dateService').equals(dateAppoinment)
                                            .where('appointmentDate.timeService').equals(timeAppoinment);
        //TODO: se debe cambiar el === por != para que funcione la logica del if
        
        const hi = DateTime.fromISO(timeAppoinment).plus({minute: (appCollaborator[0].serviceTime + appCollaborator[0].biocleaning)}).toFormat('T');

        // console.log(collaValidation.length);

        if(collaValidation.length != 0 ){
            if(collaValidation[0].appointmentDate[0].timeService >= timeAppoinment && timeAppoinment <= hi){
                return res.status(418).json({
                    ok: false,
                    msg: 'Time Range Reserved MW-GC01'
                });
            }
        } 
        
        if(collaValidation.length != 0 ){        
            
            return res.status(418).json({
                ok: false,
                msg: 'Cant book this space MW-GC02'
            });            

        }

        //TODO: Ademas que en el rango de tiempo no tenga igualmente una cita, para no pisar una cita previa

        
        // console.log(collaValidation.length);
        // console.log(collaValidation[0].appointmentDate.timeService);
        if(AppointmentDB.length ===  0){
                next();  
            }else{
            return res.status(418).json({
                ok: false,
                //dat: uid,
                msg: 'Cant book this space MW-GC03'
            });            
        }
        
        // if (BusinessDB) {
        // }else {
        //     res.status(418).json({
        //         ok: false,
        //         //dat: uid,
        //         msg: 'Require Permissions for this Operation MW12'
        //     });
        // }
    } catch (error) {
        console.log(error);
        res.status(418).json({
            ok: false,
            msg: 'Require Permissions for this Operation MW-GC04'
        });
    }
};


module.exports = {
    ExistsCollaborator,
    ExistsUser,
    ExistsBusiness,
    ExistsStaffInBusiness,
    UserSameDate,
};
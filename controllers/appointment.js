const { response } = require("express");

const { DateTime } = require("luxon");
const appointment = require("../models/appointment");
const business = require("../models/business");
const Collaborator = require("../models/Collaborator");
const services = require("../models/services");
const TypeServices = require("../models/typeServices");
const servicesParameter = require("../models/servicesParameter");
const staff = require("../models/staff");
const users = require("../models/users");
let date = DateTime.local();




const viewAppointment = async(req,res = response) => {
    console.log('Visualizar de Appoinment');
};

const createAppointments = async(req,res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'Your appointment has been successfully scheduled',
        respuesta: req.body,
    });
};
const createAppointment = async(req,res = response) => {
    const uid = req.body.user;
    const bus = req.body.business;
    const typeServices = req.body.typeServices;
    const service = req.body.services;
    const Staffservice = req.body.staffService;
    const dateAppoinment = req.body.dateService;
    const timeAppoinment = req.body.timeService;

    // console.log(typeServices);
    
    try {    
        const UserDB = await users.findById(uid).where('status').equals(true);
        const ServicesDB = await services.findById(service);
        const TypeServicesDB = await  TypeServices.findById(typeServices);
        const StaffBus = await Collaborator.findById(Staffservice);
        const BusinessDB = await business.findById(bus)
                        .where('services').in([service])
                        .where('typeServices').in([typeServices])
                        .where('status').equals(true);
        const Staff = await staff.findById(Staffservice)
                        .where('status').equals(true)
                        .where('nit').equals(BusinessDB.nit);
        const ServiParameter = await servicesParameter.find({business:bus})
                        .where('typeServices').in([typeServices]);
                        // .where('typeServices').equals(typeServices);

        // console.log(ServicesDB);
        
        const AppoinmentCreated = new appointment({
                user:{
                    userID: uid,
                    nomUser: UserDB.name,
                    apeUser: UserDB.apeUser,
                    emailUser: UserDB.email,
                    movilUser: UserDB.movil
                },
                business:{
                    business: bus,
                    nameBusiness: BusinessDB.businessName,
                    telBusiness: BusinessDB.phone.phoneNumber,
                    celBusiness: BusinessDB.movil.numberCell,
                    dirBusiness: BusinessDB.address,
                    geoLocalitationBusiness: {
                        lat: 4.602873,
                        lon: -74.202362
                    }
                },
                services:[{
                    ServicesParameter: ServiParameter[0]._id,
                    nameService: ServicesDB.name,
                    nameTypeService: TypeServicesDB.typeService,
                    servicePrice: ServiParameter[0].servicePrice,
                    serviceTime: ServiParameter[0].serviceTime,
                    biocleaning: ServiParameter[0].biocleaning
                }],
                staffServices:[{
                    staff: Staff._id,
                    nameCollaborator: Staff.name + ' ' + Staff.lastName,
                    staffType: Staff.staffType,
                }],
                appointmentDate:{
                    dateService: dateAppoinment,
                    timeService: timeAppoinment,
                    endOfService: DateTime.fromISO(timeAppoinment)
                                .plus({ minute: ServiParameter[0].serviceTime + ServiParameter[0].biocleaning }).toFormat('TT'),
                    status: true
                },
        });
        // console.log(AppoinmentCreated);
        try {
            
            await AppoinmentCreated.save();
            
            res.status(200).json({
                ok: true,
                msg: 'Your appointment has been successfully scheduled',
                AppoinmentCreated,
            });
        } catch (error) {
            return res.status(400).json({
                ok: false,
                msg: 'Talk to the Manager',
                error: error
            });
        }

    }catch (error) {
        // console.log(error);
        return res.status(500).json({
            ok: false,
            // dat: uid,
            msg: 'Require Permissions for this Operation CTR1'
        });
    }

    
    
};
const updateAppointment = async(req,res = response) => {
    console.log('Actualización de Appoinment');
};
const deleteAppointment = async(req,res = response) => {
    console.log('Modificación de Appoinment');
};





module.exports = {
    viewAppointment,
    createAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
};
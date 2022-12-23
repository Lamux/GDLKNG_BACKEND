const { response } = require("express");

const { DateTime } = require("luxon");
const business = require("../models/business");
const servicesParameter = require("../models/servicesParameter");
const staff = require("../models/staff");
let date = DateTime.local();


const viewServiceparam = async(req,res = response) =>{
    const uid = req.uid;
    const buss = req.body.business;

    try {
        const serviParamete = await servicesParameter.find({business:buss},{dateCreate:0,dateUpdate:0,servicesParameterUnique:0,__v:0})
                                                     .where('status').equals(true);
        res.status(200).json({
            ok: true,
            serviParamete
        });
        
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Hable con el Administrador ServiceParameter',
            error: error
        });        
    }                                               
};
const CreateServiceparam = async(req,res = response) =>{
    const uid = req.uid;
    const data = req.body;

    const ServiParam = new servicesParameter({
        usucrea: uid,
        servicesParameterUnique: req.body.business+'_'+req.body.services+'_'+req.body.typeServices+'_'+req.body.staffType,
        ...req.body
    });

    try {
        await ServiParam.save();
        res.status(200).json({
            ok: true,
            msg: 'Se ha Guardado Correctamente el Parametro del Servicio'
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Hable con el Administrador ServiceParameter',
            error: error
        });
    }
    
    
};
const updateServices = async(req,res = response) =>{
    const data = req.body;

    const services = {
        services: [{
            "business": data.business,
            "servicesParameter": data.servicesParameter,
            "servicePrice": data.servicePrice
        }]
        };
    const ServicesDB = await business.findById(data.business,{nit:1,typeCollaborator:1})
                                     .where('typeCollaborator').in(['62d9a08469c8bd50e68f7b99']);
    // const upStaffAndServices = await staff.findByIdAndUpdate(data.staff,{ services })
    //                                       .where('nit').equals([ServicesDB.nit]);
    console.log(ServicesDB);
    
    res.status(200).json({
        ok: true,
        ServicesDB
    });
};
const updateServiceparam = async(req,res = response) =>{
    console.log('Datos para Mostrar');
};
const deleteServiceparam = async(req,res = response) =>{
    console.log('Datos para Mostrar');
};


module.exports = {
    viewServiceparam,
    CreateServiceparam,
    updateServiceparam,
    deleteServiceparam,
    updateServices,   
};
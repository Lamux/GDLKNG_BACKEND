const { response } = require("express");
const Servicios = require("../models/servicios");
const Usuario = require("../models/usuarios");

const { DateTime } = require("luxon");
let date = DateTime.local();



const getservicios = async(req, res = response) => {

    const getservi = await Servicios.find()
                                    .populate('usucrea','nomusu apeusu');
    res.json({
        ok: true,
        getservi
    });
}; 
const crearservicios = async(req, res = response) => {

    const uid = req.uid;
    const serviciosDB = new Servicios({
        usucrea: uid,
        ...req.body
    });

    try {
        await serviciosDB.save();

        res.json({
            ok: true,
            Colaborador: serviciosDB
        });
    } catch (error) {
            // console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el Administrador',
            });
    }
}; 

const actualizaservicios = async(req, res = response) => {
    const uid = req.uid;
    const idServi = req.params.id;
    const camposServi = req.body;    
    const fchActualiza = date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
    

    try {

        const camposServiActu = await Servicios.findByIdAndUpdate(idServi, { $set:{
            nomservi: camposServi.nomservi,            
            usucrea: uid,
            fchactua: fchActualiza }
        },{new: true});
        
        res.json({
            ok: true,
            Servicio: camposServiActu
        });
    } catch (error) {
            // console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador para actualizar ...',
            });
    }

    res.json({
        ok: true,
        msg: 'actualizaservicios'
    });
}; 
// ESTA CLASE NO SE USARA CASI EN NADA SE CREA SOLO POR COMPLETAR EL CRUD
const borrarservicios = async (req, res = response) => {
    
    const idServi = req.params.id;
        
    try {
        const camposServiInactivar = await Servicios.findByIdAndDelete(idServi);

        res.json({
            ok: true,
            camposServiInactivar
        });
        
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador para eliminar el Servicio ...',
        });        
    }
}; 



module.exports = {
    getservicios,
    crearservicios,
    actualizaservicios,
    borrarservicios,
}
const { response } = require("express");
const Local = require('../models/local');
const Usuario = require("../models/usuarios");

const { DateTime } = require("luxon");
let date = DateTime.local();


const getlocal = async(req, res = response) => {
    
    const getloc = await Local.find({estaloc:true})
                            .populate('propiloc','nomusu apeusu')
                            .populate('usucrea','nomusu  apeusu');
    res.json({
        ok: true,
        getloc
    });
}; 
const crearlocal = async(req, res = response) => {
    const uid = req.uid;
    const localDB = new Local({
        usucrea: uid,
        ...req.body});
    
        // VALIDAMOS QUE EXISTA EL PROPIETARIO COMO USUARIO
    const validapropietario = await Usuario.findById({_id:req.body.propiloc});
    const validaexistelocal = await Local.find({ nitloc:req.body.nitloc});

    try {
        // GUARDAMOS LOS DATOS EN LA TABLA
        await localDB.save();

        res.json({
            ok: true,
            local: localDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
             
        });
    }
}; 
const actualizalocal = async(req, res = response) => {

    const uid = req.uid;
    const idSalon = req.params.id;

    try {
        // CONSULTAMOS SI EL ESTABLECIMIENTO EXISTE
        const existeSalon = await Local.findById(idSalon,{estaloc: true});

        if ( !existeSalon ){
            // console.log('No Existe el Salon');
            res.json({
                ok: true,
                msg: 'No Existe el Salon'
            });
        }
        // VALIDAMOS QUE EL ESTABLECIMIENTO ESTA INACTIVO
        if ( existeSalon.estaloc === false ) {
            res.status(404).json({
                ok: true,
                msg: 'El Establecimiento esta Inactivo'
            });
        } else {

            const camposLocal = req.body;
            delete camposLocal.nitloc;
            const fchActualiza = date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

            const localActualizado = await Local.findByIdAndUpdate(idSalon, { $set:{
                nomloc: camposLocal.nomloc,
                celoc: [camposLocal.celoc],
                emailoc: camposLocal.emailoc,
                teloc: [camposLocal.teloc],
                dirloc: camposLocal.dirloc,
                servicios: camposLocal.servicios,
                imgloc: camposLocal.imgloc,
                diashabiloc: camposLocal.diashabiloc,
                estaloc: camposLocal.estaloc,
                propiloc: camposLocal.propiloc,
                usucrea: uid,
                fchactua: fchActualiza }
            },{new: true});
            
            res.json({
                ok: true,
                localActualizado
            });             
        }        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador para actualizar ...'
        });
        
    }    
}; 
const borrarlocal = async(req, res = response) => {

    const uid = req.uid;
    const idSalon = req.params.id;

    try {
        // CONSULTAMOS SI EL ESTABLECIMIENTO EXISTE
        const existeSalon = await Local.findById(idSalon,{estaloc: true});

        if ( !existeSalon ){
            console.log('No Existe el Salon');
            res.json({
                ok: true,
                msg: 'No Existe el Salon'
            });
        }
        // VALIDAMOS QUE EL ESTABLECIMIENTO ESTA INACTIVO
        if ( existeSalon.estaloc === false ) {
            res.status(404).json({
                ok: true,
                msg: 'No Existe el Establecimiento ...'
            });
        } else {

            const camposLocal = req.body;
            delete camposLocal.nitloc;
            const fchActualiza = date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

            const localInactivo = await Local.findByIdAndUpdate(idSalon, { $set:{
                estaloc: false,
                usucrea: uid,
                fchactua: fchActualiza }
            },{new: true});
            
            res.json({
                ok: true,
                msg: 'El Establecimiento ha sido Borrado ...'
            });             
        }        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador para Eliminar Local ...'
        });
        
    }
}; 



module.exports = {
    getlocal,
    crearlocal,
    actualizalocal,
    borrarlocal,
}
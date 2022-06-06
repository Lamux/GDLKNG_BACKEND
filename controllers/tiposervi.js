const { response } = require("express");
const Tiposervi  = require('../models/tipo-servi');
const Servicios = require('../models/servicios');



const gettipservi = async(req, res = response) => {

    const gettipservi = await Tiposervi.find()
                                       .populate('servi','nomservi')
                                       .populate('usucrea','nomusu apeusu');

    res.json({
        ok: true,
        gettipservi
    });
}; 
const creartipservi = async(req, res = response) => {
    const uid = req.uid;
    
    const tiposerviDB = new Tiposervi({
        usucrea: uid,
        tipserviunico: req.body.servi + ' ' + req.body.tiposervi,
        ...req.body
    });
    
    // console.log({tipserviunico:req.body.servi + ' ' + req.body.tiposervi});
    // // VALIDACIONES Y VERIFICACION DE DATOS DEL CAMPO
    const validarServicio = await Servicios.findById({_id:req.body.servi});
    // const validarserviunico = await Tiposervi.find({tipserviunico:req.body.servi + ' ' + req.body.tiposervi});
    // console.log(validarserviunico);
   
    // if (validarserviunico){
    //     res.status(404).json({
    //         ok: false,
    //         msg: 'El Tipo de Servicio Ya Existe en la Base'
    //     });
    // }

    if( !validarServicio ){
        res.status(404).json({
            ok: false,
            msg: 'El Servicio No Existe'
        });
    }
    
    try {
        await tiposerviDB.save();
         
        res.json({
            ok: true,
            TipoServicio: tiposerviDB
        });
    } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el Administrador Tipo servicio Posiblemente Repetida',
            });
    }   
}; 
// NO SE REQUIERE ACTUALIZAR POR QUE ESTOS DATOS SOLO SERAN CAMBIADOS POR EL ADMINISTRADOR LAMED
const actualizatipservi = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizatipservi'
    });
}; 
const borrartipservi = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrartipservi'
    });
}; 



module.exports = {
    gettipservi,
    creartipservi,
    actualizatipservi,
    borrartipservi,
}
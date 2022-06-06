const { response } = require("express");

const Serviloc = require('../models/serviloc');
const Local = require('../models/local');

const { DateTime } = require("luxon");
const { validaEstablecimiento } = require("../middlewares/validacionesInternas");
let date = DateTime.local();
// const { validarLocal } = require('../middlewares/validar-campos');



const getserviloc = async(req, res = response) => {

    const listaLocal = await Serviloc.find()
                                     .populate('local','nomloc')
                                     .populate('serviloc','nomservi')
                                     .populate('tipservi','tiposervi');
    // console.log(listaLocal);
    res.json({
        ok: true,
        listaLocal
    });
}; 
// local > Dalos del Establecimiento
// ServiLoc > datos del Servicio en el establecimiento Ej: Peluqueria
// tipservi > De la Seleccion anterior elige Ej: Corte de Pelo 
// colaboserviloc > Datos del Usuario de la aplicacion a la que crearan como Colaborador del Establecimiento.
const crearserviloc = async(req, res = response) => {
    const uid = req.uid;
    
    const serviLocalDB = new Serviloc({
        usucrea: uid,
        unicoserviloc: req.body.local + ' ' + req.body.serviloc + ' ' + req.body.tipservi + ' ' + req.body.colaboserviloc,
        ...req.body
    });

    try {
        const serviloc = serviLocalDB.save();
        // console.log(serviloc);
        res.json({
            ok: true,
            msg: serviloc
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'                 
        });        
    }      
    

// VALIDAMOS QUE EXISTA EL SERVCICIO YA CREADO EN EL LOCAL
    // realizamos las diferentes validaciones a las tablas verificando la autenticidad dela solicitud
    // await validarLocal(req.body.local);    
}; 
const actualizaserviloc = (req, res = response) => {

    const uid = req.uid;
    const idSalon = req.params.id;
    res.json({
        ok: true,
        msg: 'actualizaserviloc'
    });
}; 
const borrarserviloc = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarserviloc'
    });
}; 



module.exports = {
    getserviloc,
    crearserviloc,
    actualizaserviloc,
    borrarserviloc,
};
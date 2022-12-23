const { response } = require("express");
const services = require("../models/services");
const typeServices = require("../models/typeServices");



const viewTSV = async(req, res = response) => {

    const gettipservi = await typeServices.find({ dateCreate: { $gt: '09/6/2022' } }, { typeService: 1, _id: 0 })
        .populate('serviceName', '-_id name');
    //.populate('servi', { nomservi: 1, _id: 0 });
    //.populate('usucrea','nomusu apeusu');

    res.json({
        ok: true,
        gettipservi
    });
};
const createTSV = async(req, res = response) => {
    const uid = req.uid;

    const tiposerviDB = new typeServices({
        creatorUser: uid,
        uniqueServices: req.body.serviceName + ' ' + req.body.typeService,
        ...req.body
    });

    const validarServicio = await services.findById({ _id: req.body.serviceName });

    if (!validarServicio) {
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
            msg: 'Hable con el Administrador Tipo servicio Ya Existe!!',
        });
    }
};
// NO SE REQUIERE ACTUALIZAR POR QUE ESTOS DATOS SOLO SERAN CAMBIADOS POR EL ADMINISTRADOR LAMED
const updateTSV = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizatipservi'
    });
};
const deleteTSV = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrartipservi'
    });
};



module.exports = {
    viewTSV,
    createTSV,
    updateTSV,
    deleteTSV,
}
const { response } = require('express');
const { validationResult, Result } = require('express-validator');

const Globales = require('../models/global');
const Local = require('../models/local');
const Servicios = require('../models/servicios');
const Colaborador = require('../models/colaboloc');
const Serviloc = require('../models/serviloc');

// 
// 
// 

const validaEstablecimiento = async(req, res = response, next) => {
    const idlocal = req.body.local;
    const validarLocal = await Local.findById(idlocal);
    if (validarLocal) {
        // console.log('El Establecimiento Si existe :P');
        next();
    } else {
        // console.log('El Establecimiento No existe ...');
        return res.status(400).json({
            ok: false,
            msg: 'El Establecimiento No Existe, Valide Con el Administrador MW1 ...'
        });
    }
};

const validarColaborador = async(req, res = response, next) => {
    const idColabora = req.body.colaboserviloc;
    const validaColabo = await Colaborador.findById(idColabora);
    if (validaColabo) {
        // console.log('El Colaborador Si existe :P');
        next();
    } else {
        // console.log('El Colaborador No existe ...');
        return res.status(400).json({
            ok: false,
            msg: 'El Colaborador No Existe, Valide Con el Administrador MW1 ...'
        });
    }
};
const validarGlobal = async(req, res = response, next) => {
    const idGlobal = req.uid;
    const validaGlobal = await Globales.find({ globuser: idGlobal });
    if (validaGlobal) {
        // console.log('El Colaborador Si existe :P');
        next();
    } else {
        // console.log('El Colaborador No existe ...');
        return res.status(400).json({
            ok: false,
            msg: 'El Global No Existe, Valide Con el Administrador MW1 ...'
        });
    }
};
const validarServicio = async(req, res = response, next) => {
    const idServiLocal = req.body.serviloc;
    const validaServiLocal = await Servicios.findById(idServiLocal);
    if (validaServiLocal) {
        // console.log('El Servicio Si existe :P');
        next();
    } else {
        // console.log('El Servicio No existe ...');
        return res.status(400).json({
            ok: false,
            msg: 'El Servicio No Existe, Valide Con el Administrador MW1 ...'
        });
    }
};
const validarServicioLocal = async(req, res = response, next) => {
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

const siEsEmail = (req, res = response, next) => {

    const email = req.body.emailusu;
    const emailValido = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{3,63}\.){1,125}[A-Z]{2,63}$/i;

    if (emailValido.test(email)) {
        next();
    } else {
        return res.status(400).json({
            ok: false,
            msg: 'El Email es incorrecto en su forma'
        });
    }

}



module.exports = {
    validaEstablecimiento,
    validarColaborador,
    validarServicio,
    validarServicioLocal,
    validarGlobal,
    siEsEmail,
};
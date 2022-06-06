const { response } = require('express');
const { validationResult, Result } = require('express-validator');



const Local = require('../models/local');
const Servicios = require('../models/servicios');

const validarCampos = (  req, res = response, next ) => {

    const errores = validationResult( req );

    if ( !errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }
    next();
};




module.exports = {
    validarCampos
};
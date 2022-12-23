const { response } = require("express");
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const ldm = require("../models/lamed");
const { DateTime } = require("luxon");
let date = DateTime.local();





const viewLamed = async(req, res = response) => {
    const getLmd = await ldm.find();

    res.json({
        ok: true,
        getLmd: getLmd
    });
};

const createLamed = async(req, res = response) => {

    const { email, pass } = req.body;
    const lamed = new ldm(req.body);

    // ENCRIPTAR CONTRASEÑA
    const salt = bcrypt.genSaltSync();
    lamed.pass = bcrypt.hashSync(pass, salt);

    try {
        // Validacion que el EMAIL existe en la DB
        const existeEmail = await ldm.findOne({ email });


        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta Registrado'
            });
        }


        await lamed.save();

        // Generar un TOKEN JWT
        const token = await generarJWT(lamed.id);

        res.json({
            ok: true,
            lamed,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }


};
const updateLamed = async(req, res = response) => {};
const deleteLamed = async(req, res = response) => {};


module.exports = {
    viewLamed,
    createLamed,
    updateLamed,
    deleteLamed,
};
const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/users');

const { DateTime } = require("luxon");
let date = DateTime.local();

const viewUser = async(req, res) => {

    const usuario = await Usuario.find({}, 'name lastName img role');
    // const now = DateTime.local({ locale: "es" });
    // .fromObject({ hour: 12 }, { zone: 'America/Bogota', numberingSystem: 'beng'});

    res.json({
        ok: true,
        usuario: usuario
    });
};

const createUser = async(req, res = response) => {

    //const datos = req.body;

    const { email, pass } = req.body;

    //console.log(req.body);

    const usuario = new Usuario(req.body);

    // ENCRIPTAR CONTRASEÑA
    const salt = bcrypt.genSaltSync();
    usuario.pass = bcrypt.hashSync(pass, salt);

    try {
        // Validacion que el EMAIL existe en la DB
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta Registrado'
            });
        }


        await usuario.save();

        // Generar un TOKEN JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
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

const updateUser = async(req, res = response) => {

    const uid = req.params.id;


    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No Existe un Usuario con ese Id'
            });
        }


        // Actualizaciones
        const campos = req.body;
        delete campos.pass;
        delete campos.tiplogin;
        delete campos.emailusu;
        const fchActualiza = date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

        // console.log(campos);

        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            uid, {
                $set: {
                    nomusu: campos.nomusu,
                    apeusu: campos.apeusu,
                    celusu: campos.celusu,
                    imgusu: campos.imgusu,
                    fchactua: fchActualiza
                }
            }, { new: true });

        res.json({
            ok: true,
            usuarioActualizado
        });

        // $2a$10$/x7/UZ6Ttct8r2Ee28gVleUR8fllcmSN1aFri2UXTtMzUWPKH8JRe

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
};

const deleteUser = async(req, res = response) => {
    const uid = req.params.id;
    const fchActualiza = date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No Existe un Usuario con ese Id'
            });
        }

        await Usuario.findByIdAndUpdate(uid, {
            $set: {
                estaloc: false,
                usucrea: uid,
                fchactua: fchActualiza
            }
        }, { new: true });

        res.json({
            ok: true,
            msg: 'Usuario Elimininado'
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error en el proceso'
        });
    }
};

module.exports = {
    viewUser,
    createUser,
    updateUser,
    deleteUser,
}
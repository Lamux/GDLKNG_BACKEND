const bcrypt = require('bcryptjs');
const { response } = require('express');
const { googleverify } = require('../helpers/googlelogin');
const { generarJWT } = require('../helpers/jwt');
const businessUsers = require('../models/businessUsers');
const lamed = require('../models/lamed');
const user = require('../models/users');
const Usuarios = require('../models/users');


const login = async(req, res = response) => {

    const { email, pass } = req.body;

    try {

        // verificar Email
        const usuarioDB = await user.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email ó Contraseña No Valida'
            });
        }
        // Verificar Pass
        const validpass = bcrypt.compareSync(pass, usuarioDB.pass);
        if (!validpass) {
            return res.status(404).json({
                ok: false,
                msg: 'Email ó Contraseña No Valida'
            });
        }

        // Generar un TOKEN JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
};

const bx = async(req, res = response) => {

    const { email, pass } = req.body;

    try {
        // verificar Email
        const usuarioDB = await businessUsers.findOne({ email });
        
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email ó Contraseña No Valida'
            });
        }
        // Verificar Pass
        const validpass = bcrypt.compareSync(pass, usuarioDB.pass);
        if (!validpass) {
            return res.status(404).json({
                ok: false,
                msg: 'Email ó Contraseña No Valida'
            });
        }
        // Generar un TOKEN JWT
        const token = await generarJWT(usuarioDB._id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
    

    
};

const lmd = async(req, res = response) => {
    const { email, pass } = req.body;

    //console.log(email);
    try {
        // verificar Email
        const LamedDB = await lamed.findOne({ email });
        if (!LamedDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email ó Contraseña No Valida'
            });
        }
        // Verificar Pass
        const validpass = bcrypt.compareSync(pass, LamedDB.pass);
        if (!validpass) {
            return res.status(404).json({
                ok: false,
                msg: 'Email ó Contraseña No Valida 2'
            });
        }
        // Generar un TOKEN JWT
        const token = await generarJWT(LamedDB.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador 2'
        });
    }
};


const googleLogin = async(req, res = response) => {

    const googleToken = req.body.token;


    try {

        const { given_name, family_name, email, picture } = await googleverify(googleToken);
        console.log({ emailusu: email });

        const usuarioDB = await Usuarios.findOne({ emailusu: email });
        let usuario;

        // console.log(ususarioDB);

        if (!usuarioDB) {
            // SI NO EXISTE
            usuario = new Usuarios({
                nomusu: given_name,
                apeusu: family_name,
                celusu: '',
                emailusu: email,
                pass: '")·=$·""',
                imgusu: picture,
                rolusu: 'USER_ROLE',
                estausu: true,
                tiplogin: 'Google'
            });
        } else {
            usuario = usuarioDB;
            usuario.tiplogin = 'Google';
        }



        // Guardar Usuario en Base de Datos
        await usuario.save();
        // Generar un TOKEN JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token: token,
            usuario: usuario
        });

    } catch (error) {

        res.status(401).json({
            ok: false,
            msg: 'Token No es correo  ...',
            // datos: ususarioDB
        });
    }
};

const validarToken = async(req, res = response) => {

    const uid = req.uid;
    //Generar un TOKEN JWT
    const token = await generarJWT(uid);
    res.json({
        ok: true,
        token,

    });
};

module.exports = {
    login,
    googleLogin,
    validarToken,
    bx,
    lmd,
};
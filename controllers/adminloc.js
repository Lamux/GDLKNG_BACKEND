const { response } = require("express");

const AdminLocal = require('../models/adminloc');
const local = require("../models/local");
const Usuario = require("../models/usuarios");


const getadminloc = async (req, res = response) => {

    const geradmin = await AdminLocal.find()
                                    .populate('usucrea','nomusu apeusu')
                                    .populate('local','nomloc')
                                    .populate(['tipcolabora','tipcolabora']);
    res.json({
        ok: true,
        geradmin
    });
}; 
const crearadminloc = async(req, res = response) => {

    const uid = req.uid;
    const adminlocalDB = new AdminLocal( {
        usucrea: uid,
        adminunicoloc: req.body.admin + ' ' + req.body.local,
        ...req.body} );

        //  ESTOS DATOS SE USARAN PARA VALIDAR LA INFORMACION QUE SE REGISTRA
        // const usu = req.body.admin;
        // const loc = req.body.local;
                    
        try{
            await adminlocalDB.save();
            res.json({
                ok: true,
                admin: adminlocalDB
            });
        } catch (error) {
                // console.log(error);
                // console.log('Hable con el Administrador');
                return res.status(400).json({
                    ok: false,
                    msg: 'Hable con el Administrador'
                });
    }
}; 
const actualizaadminloc = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizaadminloc'
    });
}; 
const borraradminloc = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borraradminloc'
    });
}; 



module.exports = {
    getadminloc,
    crearadminloc,
    actualizaadminloc,
    borraradminloc,
}
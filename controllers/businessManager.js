const { response } = require("express");
const { createBusinessUser, createStaff } = require("../middlewares/globalProcess");
const business = require("../models/business");
const businessManager = require("../models/businessManager");
const businessUsers = require("../models/businessUsers");
const staff = require("../models/staff");
const users = require("../models/users");



const viewBS = async(req, res = response) => {

    const geradmin = await businessManager.find();
    res.json({
        ok: true,
        geradmin
    });
};
const createBS = async(req, res = response) => {

    const uid = req.uid;
    const nit = req.body.nit;
    const user = req.body.manager;
    const rol = req.body.role;

    const UserDB = await users.findById({ _id: user });
    const MB = await business.find({ nit: nit });

    if(!UserDB){
        return res.status(400).json({
            ok: false,
            msg: 'No existe el Usuario Para asignar el Nuevo Rol'
        });
    }

    const ManagerDB = new businessManager({
        businessName: MB[0].businessName,
        usucrea: uid,
        businessManagerUnique: req.body.manager + ' ' + req.body.nit,
        ...req.body
    });

    const createBS = new businessUsers({
        name: UserDB.name,
        lastName: UserDB.lastName,
        email: UserDB.email,
        document: req.body.document,
        role: req.body.role,
        typeCollaborator: req.body.typeCollaborator,
        pass: UserDB.pass,
        nit: MB[0].nit,
        businessName: MB[0].businessName,
        status: true,
        userUnique: req.body.document + '_' + MB[0].nit + '_' + UserDB.email,
        creatorUser: uid,
    });
    const createBSS = new staff({
        nit: nit,
        name: UserDB.name,
        lastName: UserDB.lastName,
        document: req.body.document,
        role: req.body.role,
        typeCollaborator: req.body.typeCollaborator,
        uniqueStaff: nit + ' ' + req.body.document,
        creatorUser: uid
    });
    
    try {
        await ManagerDB.save();
        createBusinessUser(createBS);
        createStaff(createBSS);
        res.status(200).json({
            ok: true,
            msg: 'Se ha Guardado Correctamente la Informacion',
            ManagerDB
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Hable con el Administrador',
            error: error
        });
    }
};
const updateBS = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizaadminloc'
    });
};
const deleteBS = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borraradminloc'
    });
};



module.exports = {
    viewBS,
    createBS,
    updateBS,
    deleteBS,
};
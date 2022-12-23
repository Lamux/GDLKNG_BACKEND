const { response } = require("express");
const roleType = require("../models/roleType");


const viewTR = async(req, res = response) => {
    const RoleTipe = await roleType.find({}, { name: 1, category: 1, _id: 0 });
    res.json({
        ok: true,
        RoleTipe
    });
};
const createTR = async(req, res = response) => {
    const uid = req.uid;

    const tipoRolDB = new roleType({
        creatorUser: uid,
        ...req.body
    });
    try {
        await tipoRolDB.save();
        res.json({
            ok: true,
            TipoRol: tipoRolDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador TR',
        });
    }
};

const updateTR = async(req, res = response) => {
    const uid = req.uid;
    res.json({
        ok: true,
        msg: 'actualizatipoRol'
    });

};
const deleteTR = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrartipoRol'
    });
};


module.exports = {
    viewTR,
    createTR,
    updateTR,
    deleteTR,
};
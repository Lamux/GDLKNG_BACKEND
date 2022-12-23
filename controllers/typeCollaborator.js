const { response } = require("express");
const typeCollaborator = require("../models/typeCollaborator");



const viewTC = async(req, res = response) => {

    const getTipCola = await typeCollaborator.find({ dateCreate: { $gt: '09/6/1900' } }, { name: 1, _id: 0 });

    res.json({
        ok: true,
        getTipCola: getTipCola
    });
};
const createTC = async(req, res = response) => {

    const uid = req.uid;
    const tipcolaboraDB = new typeCollaborator({
        creatorUser: uid,
        ...req.body
    });

    try {

        await tipcolaboraDB.save();
        res.json({
            ok: true,
            tipcolaboraDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
        });
    }

};
const updateTC = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizatipcolabora'
    });
};
const deleteTC = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrartipcolabora'
    });
};



module.exports = {
    viewTC,
    createTC,
    updateTC,
    deleteTC,
}
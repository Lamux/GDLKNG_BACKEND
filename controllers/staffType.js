const { response } = require("express");
const staffType = require("../models/staffType");


const viewST = async(req, res = response) => {
    const StaffType = await staffType.find({}, { name: 1, _id: 0 }).populate('service', '-_id name');
    res.json({
        ok: true,
        StaffType
    });
};
const createST = async(req, res = response) => {
    const uid = req.uid;

    const StaffTypeDB = new staffType({
        creatorUser: uid,
        ...req.body
    });

    try {
        await StaffTypeDB.save();
        if (StaffTypeDB) {
            res.json({
                ok: true,
                StaffTypeDB
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: "El Type de Staff No se pudo Crear"
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error
        });
    }

};
const updateST = async(req, res = response) => {};
const deleteST = async(req, res = response) => {};




module.exports = {
    viewST,
    createST,
    updateST,
    deleteST,
};
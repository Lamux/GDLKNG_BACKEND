const { response } = require("express");
const { default: mongoose, Mongoose } = require("mongoose");
const { DateTime, Settings, Info, Zone } = require("luxon");
const staff = require("../models/staff");
// Creating a date time object
let date = DateTime.local();


const viewStaff = async(req, res = response) => {

    const nit = req.body.nitBusiness;

    const viewStaf = await staff.find({ nit }, { uniqueStaff: 0, creatorUser: 0, dateCreate: 0, dateUpdate: 0 })
        .populate('typeCollaborator', '-_id name');
        // .populate('staffType', 'name')
        // .populate('percentage.typeService', 'typeService');
    res.json({
        ok: true,
        viewStaf
    });


};

const createStaff = async(req, res = response) => {};

const parseId = (id) => {
    return mongoose.Types.ObjectId(id);
};

const updateStaff = async(req, res = response) => {
    const uid = req.uid;
    const { id } = req.params;


    try {
        const updateDocu = await staff.findByIdAndUpdate({ _id: parseId(req.params.id) }, {
            $set: {
                role: req.body.role,
                staffType: req.body.staffType,
                businessDays: req.body.businessDays,
                daysServices: req.body.daysServices,
                percentage: req.body.percentage,
                level: req.body.level,
                updatingUser: uid,
                dateUpdate: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
            }
        });
        //console.log(updateDocu);
        if (updateDocu.length !== 0) {
            return res.status(200).json({
                ok: true,
                msg: 'Se Actualizaron Correctamente los Datos'
            });
        }
        return res.status(404).json({
            ok: false,
            msg: 'No se Actualizo Correctamente los Datos 2'
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'No se Actualizo Correctamente los Datos 3 ' + error
        });
    }




};
const deleteStaff = async(req, res = response) => {};


module.exports = {
    viewStaff,
    createStaff,
    updateStaff,
    deleteStaff,
};
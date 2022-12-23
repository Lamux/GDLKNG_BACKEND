const { response } = require("express");

const { DateTime } = require("luxon");
const holidays = require("../models/holidays");
let date = DateTime.local();




const viewHolaiday = async (req,res = response) => {
    console.log('Datos de View');

    const HolidayDB = await holidays.find();

    res.json({
        ok: true,
        HolidayDB
    });





};
const createHolaiday = async (req,res = response) => {
    const uid = req.uid;
    const HolidayDB = new holidays({
        creatorUser: uid,
        ...req.body
    });
    try {
        await HolidayDB.save();
        return res.json({
            ok: true,
            msg: 'Se almaceno la Información Correctamente'
        });
    } catch (error) {
        return res.status(409).json({
            ok: false,
            error
        });        
    }
};
const updateHolaiday = async (req,res = response) => {
    console.log('Datos de Update');
};
const deleteHolaiday = async (req,res = response) => {
    console.log('Datos de Dalete');
};


module.exports = {
    viewHolaiday,
    createHolaiday,
    updateHolaiday,
    deleteHolaiday
};
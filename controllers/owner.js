const { response } = require("express");
const { createBusinessUser } = require("../middlewares/globalProcess");
const businessUsers = require("../models/businessUsers");
const owner = require("../models/owner");
const propiLoc = require("../models/owner");
const users = require("../models/users");

const viewOwner = async(req, res = response) => {

    const OwnerView = await propiLoc.find({}, { creatorUser: 0, dateCreate: 0, dateUpdate: 0, _id: 0 })
        .populate('owner', 'name lastName status');

    res.json({
        ok: true,
        OwnerView
    });

};

const createOwner = async(req, res = response) => {
    const uid = req.uid;

    console.log(req.body.role);

    const OwnerBD = new owner({
        creatorUser: uid,
        owner: req.body.owner,
        role: req.body.role,
        document: req.body.document
    });

    //VALIDAMOS QUE EXISTA COMO USER
    const GetOwner = await users.findById({ _id: req.body.owner }).where('estausu').equals(true);
    //console.log(GetOwner);
    if (!GetOwner) {
        res.status(404).json({
            ok: false,
            msg: 'El Usuario No Existe o esta Inactivo'
        });
    }

    const existOwner = await owner.find({ name: req.body.owner }).where('status').equals(true);

    try {
        if (!existOwner) {
            res.status(404).json({
                ok: false,
                msg: 'El Usuario Ya Existe como Owner ...'
            });
        }

        try {
            await OwnerBD.save();
            res.json({
                ok: true,
                OwnerBD: OwnerBD
            });
        } catch (error) {
            //console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el Administrador El Propietario Ya Existe!!!',
            });
        }
    } catch (error) {
        //console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado WNR'
        });
    }
};

const updateOwner = async(req, res = response) => {

};

const deleteOwner = async(req, res = response) => {

};






module.exports = {
    viewOwner,
    createOwner,
    updateOwner,
    deleteOwner,
};
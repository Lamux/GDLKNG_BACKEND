const { response } = require("express");

const { DateTime } = require("luxon");
let date = DateTime.local();


const business = require("../models/business");
const users = require("../models/users");
const businessUsers = require("../models/businessUsers");
const Owner = require("../models/owner");
const { createBusinessUser } = require("../middlewares/globalProcess");
const businessManager = require("../models/businessManager");




const viewBusiness = async(req, res = response) => {

    const getloc = await business.find({ status: true }).explain();
    //.populate('propiloc', 'nomusu apeusu')
    //.populate('usucrea', 'nomusu  apeusu');
    res.json({
        ok: true,
        getloc
    });
};

const createBusiness = async(req, res = response) => {
    const uid = req.uid;
    const owner = req.body.owner;
    const businessName = req.body.businessName;
    const nit = req.body.nit;


    const BusinessDB = new business({
        creatorUser: uid,
        businessUnique: businessName + '_' + nit + '_' + owner,
        ...req.body
    });

    const ExistsOwnerUser = await users.findById({ _id: owner });

    const existsBusiness = await business.find({ nit });
    const existsOwner = await Owner.find({ owner });

    const createBS = new businessUsers({
        name: ExistsOwnerUser.name,
        lastName: ExistsOwnerUser.lastName,
        email: ExistsOwnerUser.email,
        document: req.body.document,
        pass: ExistsOwnerUser.pass,
        status: true,
        nit: nit,
        businessName: businessName,
        userUnique: existsOwner.document + '_' + nit + '_' + ExistsOwnerUser.email,
        creatorUser: uid,
    });

    if (!existsBusiness) {
        return res.status(400).json({
            ok: false,
            msg: 'Error al crear el Establecimiento ...!!'
        });
    }
    if (existsOwner[0] === undefined) {
        return res.status(400).json({
            ok: false,
            msg: 'El Propietario No Existe ...!!'
        });
    }
    try {
        await BusinessDB.save();
        createBusinessUser(createBS);
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

const updateBusiness = async(req, res = response) => {

    const uid = req.uid;
    const idSalon = req.params.id;

    try {
        // CONSULTAMOS SI EL ESTABLECIMIENTO EXISTE
        const existeSalon = await Local.findById(idSalon, { status: true });

        if (!existeSalon) {
            // console.log('No Existe el Salon');
            res.status(400).json({
                ok: true,
                msg: 'No Existe el Salon'
            });
        }
        // VALIDAMOS QUE EL ESTABLECIMIENTO ESTA INACTIVO
        if (existeSalon.estaloc === false) {
            res.status(404).json({
                ok: true,
                msg: 'El Establecimiento esta Inactivo'
            });
        } else {

            const camposLocal = req.body;
            delete camposLocal.nitloc;
            const fchActualiza = date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

            const localActualizado = await Local.findByIdAndUpdate(idSalon, {
                $set: {
                    nomloc: camposLocal.nomloc,
                    celoc: [camposLocal.celoc],
                    emailoc: camposLocal.emailoc,
                    teloc: [camposLocal.teloc],
                    dirloc: camposLocal.dirloc,
                    servicios: camposLocal.servicios,
                    imgloc: camposLocal.imgloc,
                    diashabiloc: camposLocal.diashabiloc,
                    estaloc: camposLocal.estaloc,
                    propiloc: camposLocal.propiloc,
                    usucrea: uid,
                    fchactua: fchActualiza
                }
            }, { new: true });

            res.json({
                ok: true,
                localActualizado
            });
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador para actualizar ...'
        });

    }
};
const deleteBusiness = async(req, res = response) => {

    const uid = req.uid;
    const idSalon = req.params.id;

    try {
        // CONSULTAMOS SI EL ESTABLECIMIENTO EXISTE
        const existeSalon = await Local.findById(idSalon, { estaloc: true });

        if (!existeSalon) {
            console.log('No Existe el Salon');
            res.json({
                ok: true,
                msg: 'No Existe el Salon'
            });
        }
        // VALIDAMOS QUE EL ESTABLECIMIENTO ESTA INACTIVO
        if (existeSalon.estaloc === false) {
            res.status(404).json({
                ok: true,
                msg: 'No Existe el Establecimiento ...'
            });
        } else {

            const camposLocal = req.body;
            delete camposLocal.nitloc;
            const fchActualiza = date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

            const localInactivo = await Local.findByIdAndUpdate(idSalon, {
                $set: {
                    estaloc: false,
                    usucrea: uid,
                    fchactua: fchActualiza
                }
            }, { new: true });

            res.json({
                ok: true,
                msg: 'El Establecimiento ha sido Borrado ...'
            });
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador para Eliminar Local ...'
        });

    }
};



module.exports = {
    viewBusiness,
    createBusiness,
    updateBusiness,
    deleteBusiness,
};
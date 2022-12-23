const { response } = require("express");

const { DateTime } = require("luxon");
const Collaborator = require("../models/Collaborator");
const business = require("../models/business");
const users = require("../models/users");
const staff = require("../models/staff");
const businessUsers = require("../models/businessUsers");
const { createBusinessUser, createStaff } = require("../middlewares/globalProcess");
let date = DateTime.local();


const viewCollaborator = async(req, res = response) => {

    const getColabo = await Collaborator.find();
    // .populate('Business', 'businessName')
    // .populate('userCreate', 'name lastName')
    // .populate('servicola', 'tipcolabora');
    res.json({
        ok: true,
        getColabo
    });
};

const createCollaborator = async(req, res = response) => {
    const uid = req.uid;
    const nit = req.body.nit;
    const user = req.body.collaborator;
    const role = req.body.role;
    const servi = req.body.services;
    const typeCollaborator = req.body.typeCollaborator;

    console.log(req.body);
    console.log(servi);

    const UserDB = await users.findById({ _id: user });
    const MB = await business.find({ nit: nit });

    const colaboDB = new Collaborator({
        businessName: MB.businessName,
        creatorUser: uid,
        collaboratorUnique: req.body.collaborator + ' ' + req.body.nit,
        ...req.body
    });

    const createCLL = new businessUsers({
        name: UserDB.name,
        lastName: UserDB.lastName,
        email: UserDB.email,
        document: req.body.document,
        pass: UserDB.pass,
        role: role,
        typeCollaborator: typeCollaborator,
        nit: nit,
        businessName: MB[0].businessName,
        status: true,
        userUnique: req.body.document + '_' + nit + '_' + UserDB.email,
        creatorUser: uid,
    });

    const createSff = new staff({
        nit: nit,
        name: UserDB.name,
        lastName: UserDB.lastName,
        uniqueStaff: nit + ' ' + req.body.document,
        creatorUser: uid,
        ...req.body
    });

    console.log('CreacionStaff: ',createSff);

    if (createCLL.lenth == 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se ha creado el Negocio'
        });
    }

    try {
        await colaboDB.save();
        createBusinessUser(createCLL);
        createStaff(createSff);
        res.status(200).json({
            ok: true,
            msg: 'Se ha Guardado Correctamente la Informacion',
            colaboDB,
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Hable con el Administrador',
            error: error
        });
    }


};

const updateCollaborator = async(req, res = response) => {

    const uid = req.uid;
    const idColabodor = req.params.id;

    try {
        const existeColabora = await Colaboradores.findById(idColabodor, { estacolab: true });

        if (!existeColabora) {
            // console.log('No Existe el Colaborador');
            res.json({
                ok: true,
                msg: 'No Existe el Colaborador'
            });
        }
        // VALIDAMOS QUE EL ESTABLECIMIENTO ESTA INACTIVO
        if (existeColaborador.estacolab === false) {
            res.status(404).json({
                ok: true,
                msg: 'El Colaborador No Existe ...'
            });
        } else {

            const camposColabora = req.body;
            delete camposColabora.pass;
            const fchActualiza = date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

            const camposColaboraActu = await Colaboradores.findByIdAndUpdate(idColabodor, {
                $set: {
                    servicola: camposColabora.servicola,
                    imgcola: camposColabora.imgcola,
                    estacolab: camposColabora.estacolab,
                    usucrea: uid,
                    fchactua: fchActualiza
                }
            }, { new: true });

            res.json({
                ok: true,
                camposColaboraActu
            });
        }

    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador para actualizar ...'
        });
    }
};

// PARA ELIMINAR DATOS DEL COLABORADOR SOLO LO PUEDE HACER EL ADMINISTRADOR DE ESE LOCAL ...
const deleteCollaborator = async(req, res = response) => {

    const uid = req.uid;
    const idColabodor = req.params.id;

    try {

        const camposColabora = req.body;
        delete camposColabora.pass;
        const fchActualiza = date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

        const camposColaboraInactivar = await Colaboradores.findByIdAndUpdate(idColabodor, {
            $set: {
                estacolab: false,
                usucrea: uid,
                fchactua: fchActualiza
            }
        }, { new: true });

        res.json({
            ok: true,
            camposColaboraInactivar
        });

    } catch (error) {

        // console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador para eliminar Colaborador ...'
        });

    }
};



module.exports = {
    viewCollaborator,
    createCollaborator,
    updateCollaborator,
    deleteCollaborator,
}
const { response } = require("express");
const Globales = require('../models/global');
const { DateTime } = require("luxon");
// Creating a date time object
let date = DateTime.local();


const getglobal = async (req, res = response) => {

    const geradmin = await Globales.find()
                                   .populate('globuser','nomusu apeusu')
                                   .populate('local','nomloc')
                                   .populate(['tipcolabora','tipcolabora'])
                                   .populate(['usucrea','nomusu apeusu']);
    res.json({
        ok: true,
        geradmin
    });
}; 
const crearglobal = async(req, res = response) => {

    const uid = req.uid;
    const globalDB = new Globales( {
        usucrea: uid,
        globnunicoloc: req.body.admin + ' ' + req.body.local,
        ...req.body} );

        //  ESTOS DATOS SE USARAN PARA VALIDAR LA INFORMACION QUE SE REGISTRA
        // const usu = req.body.admin;
        // const loc = req.body.local;
                    
        try{
            await globalDB.save();
            res.json({
                ok: true,
                admin: globalDB
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
const actualizaglobal = async(req, res = response) => {
    const uid = req.uid;
    const idglobal = req.params.id;
    try {
        const existeglobal = await Globales.findById(idglobal,{estacolab: true});

        if ( !existeglobal ){
            // console.log('No Existe el Colaborador');
            res.json({
                ok: true,
                msg: 'No Existe el Colaborador'
            });
        }
        // VALIDAMOS QUE EL ESTABLECIMIENTO ESTA INACTIVO
        if ( existeglobal.estaglobuser === false ) {
            res.status(404).json({
                ok: true,
                msg: 'El Global No Existe o esta Inactivo ...'
            });
        } else {

            const camposglobal = req.body;
            delete camposColabora.pass;
            const fchActualiza = date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

            const camposglobalActu = await Globales.findByIdAndUpdate(idglobal, { $set:{
                globuser: camposglobal.globuser,
                imgcola: camposglobal.imglobuser,
                estacolab: camposglobal.estaglobuser,
                usucrea: uid,
                fchactua: fchActualiza }
            },{new: true});
            
            res.json({
                ok: true,
                camposglobalActu
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
const borrarglobal = async (req, res = response) => {
    const uid = req.uid;
    const idglobal = req.params.id;
    try {

        const camposglobal = req.body;
        delete camposglobal.pass;
        const fchActualiza = date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

        const camposglobalInactivar = await Colaboradores.findByIdAndUpdate(idColabodor, { $set:{
            estaglobuser: false,
            usucrea: uid,
            fchactua: fchActualiza}
        },{new: true});
            
        res.json({
            ok: true,
            camposglobalInactivar
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
    getglobal,
    crearglobal,
    actualizaglobal,
    borrarglobal,
}
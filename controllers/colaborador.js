const { response } = require("express");

const local = require("../models/local");
const Usuario = require("../models/usuarios");
const  Colaboradores  = require('../models/colaboloc');

const { DateTime } = require("luxon");
let date = DateTime.local();


const getcolaborador = async(req, res = response) => {

    const getColabo = await Colaboradores.find()
            .populate('local','nomloc')
            .populate('usucrea','nomusu apeusu')
            .populate('servicola','tipcolabora');
    res.json({
        ok: true,
        getColabo
    });
}; 
const crearcolaborador = async(req, res = response) => {
    const uid = req.uid;
    const colaboDB = new Colaboradores({
        usucrea: uid,
        colabounico: req.body.colabo + ' ' + req.body.local,
        ...req.body
    });

    // VALIDACION Y VERIFICACION DE DATOS DEL CAMPO
    const validarLocal = await local.findById({_id:req.body.local});
    const validarColabo = await Usuario.findById({_id:req.body.colabo});
    // const validarexistecolaboenlocal = await Colaboradores.find({ colabounico: req.body.colabo + ' ' + req.body.local });

    if( !validarLocal ){
        res.status(404).json({
            ok: false,
            msg: 'El Local No Existe'
        });
    }
    if( !validarColabo ){
        res.status(404).json({
            ok: false,
            msg: 'El Usuario No Existe'
        });
    }
    // if( validarexistecolaboenlocal ){
    //     res.status(404).json({
    //         ok: false,
    //         msg: 'El Colaborador Ya Existe para el Local'
    //     });
    // }
    try {
        await colaboDB.save();

        res.json({
            ok: true,
            Colaborador: colaboDB
        });
    } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el Administrador',
            });
    }
    
};

const actualizacolaborador = async(req, res = response) => {

    const uid = req.uid;
    const idColabodor = req.params.id;

    try {
        const existeColabora = await Colaboradores.findById(idColabodor,{estacolab: true});

        if ( !existeColabora ){
            // console.log('No Existe el Colaborador');
            res.json({
                ok: true,
                msg: 'No Existe el Colaborador'
            });
        }
        // VALIDAMOS QUE EL ESTABLECIMIENTO ESTA INACTIVO
        if ( existeColaborador.estacolab === false ) {
            res.status(404).json({
                ok: true,
                msg: 'El Colaborador No Existe ...'
            });
        } else {

            const camposColabora = req.body;
            delete camposColabora.pass;
            const fchActualiza = date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

            const camposColaboraActu = await Colaboradores.findByIdAndUpdate(idColabodor, { $set:{
                servicola: camposColabora.servicola,
                imgcola: camposColabora.imgcola,
                estacolab: camposColabora.estacolab,
                usucrea: uid,
                fchactua: fchActualiza }
            },{new: true});
            
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
const borrarcolaborador = async(req, res = response) => {

    const uid = req.uid;
    const idColabodor = req.params.id;

    try {

        const camposColabora = req.body;
        delete camposColabora.pass;
        const fchActualiza = date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

        const camposColaboraInactivar = await Colaboradores.findByIdAndUpdate(idColabodor, { $set:{
            estacolab: false,
            usucrea: uid,
            fchactua: fchActualiza}
        },{new: true});
            
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
    getcolaborador,
    crearcolaborador,
    actualizacolaborador,
    borrarcolaborador,
}
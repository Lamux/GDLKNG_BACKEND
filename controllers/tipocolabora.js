const { response } = require("express");
const Tiposervi  = require('../models/tipo-servi');
const Tipocolabora = require('../models/tipcolabora');



const gettipcolabora = async(req, res = response) => {

    res.json({
        ok: true,
        msg: 'gettipcolabora'
    });
}; 
const creartipcolabora = async(req, res = response) => {

    const uid = req.uid;
    const tipcolaboraDB = new Tipocolabora({
        usucrea: uid,
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
const actualizatipcolabora = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizatipcolabora'
    });
}; 
const borrartipcolabora = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrartipcolabora'
    });
}; 



module.exports = {
    gettipcolabora,
    creartipcolabora,
    actualizatipcolabora,
    borrartipcolabora,
}
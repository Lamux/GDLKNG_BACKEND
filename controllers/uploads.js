const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizaImagen } = require("../helpers/actualizarImagen");
const local = require("../models/local");

const fileUpload = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const id   = req.params.id;

    const tipvalidos = ['local','admin','colaboradores','usuarios'];
    if( !tipvalidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un local, admin, colaboradores o usuarios'
        });
    }
    // VALIDAMOS QUE EXITA UN ARCHIVO 
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se ha cargado un archivo'
        });
      }
    // PROCESAR IMAGEN
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length -1 ];

    // VALIDAR EXTENCIONES
    const extensionesValidas = ['png','jpg','jpeg','git'];
    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }

    // GENERAR EL NOMBRE DEL ARCHIVO
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // PATH PARA GUARDAR IMAGEN
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    // console.log(path);

    //  MOVER LA IMAGEN
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                    ok: false,
                    msg: 'Error al mover la Imagen'
            });
        }

        // ACTUALIZAR BASE DE DATOS
        actualizaImagen( tipo, id, nombreArchivo);
        

        res.json({
            ok: true,
            msg: 'Archivo Cargado ',
            nombreArchivo
        });
    });
};

const retornaImagen = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }`);
    
    // IMAGEN POR DEFECTO
    
    if ( fs.existsSync( pathImg ) ){
        res.sendFile( pathImg );
    }else {
        const pathImg = path.join( __dirname, `../uploads/sin_img.png`);
        res.sendFile( pathImg );
    }




}

module.exports = {
    fileUpload,
    retornaImagen
};
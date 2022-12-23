const fs = require('fs');
const { DateTime, Settings, Info, Zone } = require("luxon");

// Creating a date time object
let date = DateTime.local();

const Usuario = require('../models/users');
const Colaborador = require('../models/colaboloc');
const Local = require('../models/local');
const Admin = require('../models/adminloc');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        // BORRAR LA IMAGEN ALMACENADA
        fs.unlinkSync(path);
    }
};

const actualizaImagen = async(tipo, id, nombreArchivo) => {

    switch (tipo) {
        case 'local':
            const salon = await Local.findById(id);
            if (!salon) {
                console.log('No es un Local Existente ...');
                return false;
            }
            const localViejo = `./uploads/local/${ salon.imgloc }`;
            // console.log(pathViejo);

            borrarImagen(localViejo);

            console.log(localViejo);

            salon.imgloc = [nombreArchivo];
            salon.fchactua = date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
            await salon.save();
            return true;
            break;
        case 'admin':
            const admin = await Admin.findById(id);
            if (!admin) {
                console.log('No es un Administrador Existente ...');
                return false;
            }
            const adminViejo = `./uploads/admin/${ admin.imgadmin }`;

            borrarImagen(adminViejo);

            admin.imgadmin = nombreArchivo;
            admin.fchactua = date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
            await admin.save();
            return true;
            break;
        case 'colaboradores':
            const colabora = await Colaborador.findById(id);
            // console.log(id);
            if (!colabora) {
                console.log('No es un Colaborador Existente ...');
                return false;
            }
            const colaboViejo = `./uploads/colaboradores/${ colabora.imgcola[0] }`;


            borrarImagen(colaboViejo);

            colabora.imgcola = [nombreArchivo];
            colabora.fchactua = date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

            await colabora.save();
            return true;
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es un Usuario Existente ...');
                return false;
            }
            const usuViejo = `./uploads/usuarios/${ usuario.imgusu }`;

            console.log(usuViejo);
            borrarImagen(usuViejo);

            usuario.imgusu = nombreArchivo;
            usuario.fchactua = date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
            await usuario.save();
            return true;

            break;
    }
};


module.exports = {
    actualizaImagen,
}
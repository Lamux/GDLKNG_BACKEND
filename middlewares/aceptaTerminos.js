const { response } = require('express');

const esVerdadero = (req, res = response, next) => {
    const terminosUsu = req.body.terminosusu;
    // console.log(terminosusu);
    //VALIDAMOS QUE EL CAMPO SOLO TENGA EL VALOR TRUE, PARA QUE SIGA HACIA LA BD
    if (terminosUsu == true) {
        next();
    } else {
        return res.status(400).json({
            ok: false,
            msg: 'Las Condiciones de Uso de la Plataforma deben ser Aceptadas ...'
        });
    }
};

module.exports = {
    esVerdadero
};
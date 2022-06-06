const { response } = require("express");
const jwt = require("jsonwebtoken");


const validarJWT = ( req, res = response, next ) => {

    // LEER EL TOKEN
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay Token en la Peticion'
        });
    }

    try {        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        // pasamos el UID a la Request para que desde alli podamos validar el usuario.
        req.uid = uid;
        next();
    } catch (error) {
        
        return res.status(401).json({
            ok: false,
            msg: 'Token Incorrecto'
        });
    }
};




module.exports = {
    validarJWT,
};
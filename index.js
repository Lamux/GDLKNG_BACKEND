require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { dbConn } = require('./database/config');

// servicios GDLKNG
const app = express();

// Base de Datos 
dbConn();

// CORS 
// TODO: Se debe validar la lista blanca de conexion a la API
app.use(cors());
// MORGAN
app.use(morgan('combined'));
// console.log( process.env );


// RUTAS
app.get('/', (req, res) => {
    res.status(400).json({
        ok: true,
        msg: 'Hola Gerson Sáenz'
    });
});






app.listen(process.env.PORT, () => {
    console.log(`Servidor API en puerto ${process.env.PORT}`);
});
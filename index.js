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

app.use(express.json());

// Rutas
// enrutamos hacia LOGIN
// app.use('/api/login', require('./routes/auth'));
// enrutamos hacia USUARIO
app.use('/api/usuarios', require('./routes/usuarios'));
// enrutamos hacia LOCAL O PELUQUERIA
// app.use('/api/local', require('./routes/local'));
// enrutamos hacia COLABORADORES
// app.use('/api/colaborador', require('./routes/colaborador'));
// enrutamos hacia AMINISTRADORES DEL LOCAL
// app.use('/api/adminloc', require('./routes/adminloc'));
// enrutamos Globales
// app.use('/api/global', require('./routes/global'));
// enrutamos hacia LOS SERVICIOS QUE PUEDEN OFRECER LOS LOCALES
// app.use('/api/servicios', require('./routes/servicios'));
// enrutamos el tipo de servicio
// app.use('/api/tipo-servi', require('./routes/tipo-servi'));
// AQUI TENDRAN QUE IR LAS RUTAS PARA EL AGENDAMIENTO, PAGOS ENTRE OTROS
// app.use('/api/serviloc', require('./routes/serviloc'));
// AQUI TENDREMOS LA RUTA PARA CARGAR LAS IMAGENES DEL USUARIO
// app.use('/api/uploads', require('./routes/uploads'));
// CREAMOS LA RUTA PARA LOS TIPO DE COLABORADOR QUE TIENE UN SALON
// app.use('/api/tipcolaborador', require('./routes/tipcolabora'));







app.listen(process.env.PORT, () => {
    console.log(`Servidor API en puerto ${process.env.PORT}`);
});
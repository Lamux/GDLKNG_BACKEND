require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { dbConn } = require('./database/config');
const app = express();

dbConn();
// TODO: Se debe validar la lista blanca de conexion a la API
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/login/bx', require('./routes/auth'));
app.use('/api/login/lmd', require('./routes/auth'));
app.use('/api/lmd', require('./routes/lamed'));
app.use('/api/usr', require('./routes/users'));
app.use('/api/wnr', require('./routes/owner'));
app.use('/api/bm', require('./routes/businessManager'));
app.use('/api/cll', require('./routes/collaborator'));
app.use('/api/tc', require('./routes/typeCollaborator'));
app.use('/api/tr', require('./routes/roleType'));
app.use('/api/bus', require('./routes/business'));
app.use('/api/sv', require('./routes/services'));
app.use('/api/tsv', require('./routes/typeServices'));
app.use('/api/st', require('./routes/staffType'));
app.use('/api/usf', require('./routes/staff'));
app.use('/api/hds', require('./routes/holidays'));
app.use('/api/sp', require('./routes/serviceParameter'));
app.use('/api/epa', require('./routes/appointment'));








app.listen(process.env.PORT, () => {
    console.log(`Servidor API en puerto ${process.env.PORT}`);
});
var mongoose = require("mongoose");
var config = require('dotenv').config();
// mongoose.connect('mongodb://localhost');

const dbConn = async function() {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            //userNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true
        });
        console.log('DB OnLine');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la BD ver Logs');
    }
};

module.exports = {
    dbConn
};
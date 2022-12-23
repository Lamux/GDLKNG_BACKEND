const { Schema, model } = require('mongoose');
const { DateTime, Settings, Info, Zone } = require("luxon");


// Creating a date time object
let date = DateTime.local();

const LmdSchema = Schema({
    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true,
    },
    document: {
        type: Number,
        unique: true,
        require: true,
        min: [8, "Minimo 8 Digitos"]
    },
    movil: {
        type: Number,
        min: [8, "Minimo 8 Digitos"],
        // max: [11, "Maximo 11 Digitos"]
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    pass: {
        type: String,
        require: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        default: "LAMED_ROLE"
    },
    status: {
        type: Boolean,
        default: true
    },
    dateCreate: {
        type: String,
        default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    },
    dateUpdate: {
        type: String,
        default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    },
}, { collection: 'lamed' });

LmdSchema.method('toJSON', function() {
    const { __v, _id, passLmd, ...object } = this.toObject();
    return object;
});

module.exports = model('Lmd', LmdSchema);
const { Schema, model } = require('mongoose');
const { DateTime } = require("luxon");

// Creating a date time object
let date = DateTime.local();


const UsuarioShema = Schema({
    nomusu: {
        type: String,
        require: true
    },
    apeusu: {
        type: String,
        require: true

    },
    celusu: {
        type: Number,
        require: true,
    },
    emailusu: {
        type: String,
        require: true,
        unique: true
    },
    pass: {
        type: String,
        require: true,
    },
    imgusu: {
        type: String,
    },
    codref: {
        type: String,
    },
    rolusu: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    estausu: {
        type: Boolean,
        default: true
    },
    terminosusu: {
        type: Boolean,
        require: true
    },
    tiplogin: {
        type: String,
        default: 'Login'
    },
    fchcrea: {
        type: String,
        default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    },
    fchactua: {
        type: String,
        default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    },
}, { collection: 'usuarios' });

UsuarioShema.method('toJSON', function() {
    const { __v, _id, pass, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Usuario', UsuarioShema);
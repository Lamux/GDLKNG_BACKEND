const { Schema, model } = require('mongoose');
const { DateTime } = require("luxon");

// Creating a date time object
let date = DateTime.local();


const UsuarioShema = Schema({
    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true

    },
    movil: {
        type: Number,
        require: true,
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
        require: true,
        default: 'USER_ROLE'
    },
    status: {
        type: Boolean,
        default: true
    },
    terms: {
        type: Boolean,
        require: true
    },
    loginType: {
        type: String,
        default: 'Login'
    },
    dateCreate: {
        type: String,
        default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    },
    dateUpdate: {
        type: String,
        default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    },
}, { collection: 'users' });

UsuarioShema.method('toJSON', function() {
    const { __v, _id, pass, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('User', UsuarioShema);
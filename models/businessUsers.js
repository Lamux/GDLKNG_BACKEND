const { Schema, model } = require('mongoose');
const { DateTime, Settings, Info, Zone } = require("luxon");

// Creating a date time object
let date = DateTime.local();


const BusinessUsersShema = Schema({
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
    },
    email: {
        type: String,
        require: true,
    },
    document: {
        type: Number,
        require: true,
    },
    pass: {
        type: String,
        require: true,
    },
    changePass: {
        type: Boolean,
        default: false,
        require: true,
    },
    img: {
        type: String,
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'roleType',
        require: true
    },
    typeCollaborator: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'TypeCollaborator',
            require: true
        }]
    },
    terms: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
    },
    userUnique: {
        type: String,
        unique: true
    },
    nit: [{
        type: Number,
        min: [9999999, "Minimo 8 Digitos"],
        max: [9999999999, "Maximo 10 Digitos"]
    }],
    businessName: [{
        type: String,
    }],
    creatorUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    dateCreate: {
        type: String,
        default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    },
    dateUpdate: {
        type: String,
        default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    },
}, { collection: 'businessUsers' });

BusinessUsersShema.method('toJSON', function() {
    const { __v, _id, pass, ...object } = this.toObject();
    return object;
});

module.exports = model('BusinessUser', BusinessUsersShema);
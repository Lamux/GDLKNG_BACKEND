const { Schema, model } = require('mongoose');
const { DateTime } = require("luxon");

// Creating a date time object
let date = DateTime.local();


const businessManagerSchema = Schema({
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    document: {
        type: Number,
        min: [99999, "Minimo 1 Digitos"],
        max: [9999999999, "Maximo 10 Digitos"],
        require: true,
    },
    status: {
        type: Boolean,
        default: true
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
    nit: {
        type: Number,
        require: true,
        min: [9999999, "Minimo 8 Digitos"],
        max: [9999999999, "Maximo 10 Digitos"],
    },
    businessName: {
        type: String,
        require: true
    },
    business: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Business',
            require: true
        }]
    },
    businessManagerUnique: {
        type: String,
        unique: true
    },
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
}, { collection: 'businessManager' });

businessManagerSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('BusinessManager', businessManagerSchema);
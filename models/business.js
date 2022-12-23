const { Schema, model } = require('mongoose');
const { DateTime, Settings, Info, Zone } = require("luxon");

// Creating a date time object
let date = DateTime.local();


const BusinessShema = Schema({
    businessName: {
        type: String,
        require: true
    },
    nit: {
        type: Number,
        require: true,
        min: [9999999, "Minimo 8 Digitos"],
        max: [9999999999, "Maximo 10 Digitos"],
        unique: true,
    },
    movil: {
        numberCell: { type: String, required: true, unique: true, min: 9, max: 10 },
        description: { type: String }
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        phoneNumber: { type: String, required: true, unique: true, min: 9, max: 10 },
        description: { type: String }
    },
    address: {
        type: String,
        require: true,
    },
    services: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Services',
            require: true
        }]
    },
    typeServices: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'TypeServices',
            require: true
        }]
    },
    img: {
        type: [{
            type: String
        }],
        max: 3
    },
    businessDays: [{
        type: String,
    }],
    daysServices: [{
        dayWeek: { type: String },
        dayNumber: { type: Number },
        startTime: { type: String },
        endTime: { type: String },
    }],
    status: {
        type: Boolean,
        default: true
    },
    owner: [{
        type: Schema.Types.ObjectId,
        ref: 'Owner',
        require: true
    }],
    creatorUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    uniqueBusiness: {
        type: String,
        unique: true,
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
}, { collection: 'business' });

BusinessShema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model('Business', BusinessShema);
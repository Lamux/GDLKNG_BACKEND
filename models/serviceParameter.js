const { Schema, model } = require('mongoose');
const { DateTime, Settings, Info, Zone } = require("luxon");


// Creating a date time object
let date = DateTime.local();


const serviceParameterSchema = Schema({
    business: {
        type: Schema.Types.ObjectId,
        ref: 'Business',
        require: true
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
    staffType: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'staffType',
            require: true
        }]
    },
    serviceTime: {
        type: Number,
        require: true
    },
    biocleaning: {
        type: Number,
        require: true
    },
    servicePrice: {
        type: Number,
        require: true
    },
    serviceParameterUnique: {
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
},{ collection: 'servicesParameters' });


serviceParameterSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('ServicesParameter', serviceParameterSchema);
const { Schema, model } = require('mongoose');
const { DateTime } = require("luxon");

// Creating a date time object
let date = DateTime.local();

const servicesParameterSchema = Schema({
    business: {
        type: Schema.Types.ObjectId,
        ref: 'Business',
        require: true        
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        require: true
    },
    typeServices: {
        type: Schema.Types.ObjectId,
        ref: 'TypeServices',
        require: true        
    },
    staffType: {
        type: Schema.Types.ObjectId,
        ref: 'staffType',
        require: true
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
    status: {
        type: Boolean,
        default: true
    },
    servicesParameterUnique: {
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
}, { collection: 'servicesParameter' });

servicesParameterSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('ServicesParameter', servicesParameterSchema);
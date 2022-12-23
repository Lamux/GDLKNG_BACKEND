const { Schema, model } = require('mongoose');
const { DateTime } = require("luxon");

// Creating a date time object
let date = DateTime.local();


const typeServicesSchema = Schema({
    serviceName: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        require: true,
    },
    typeService: {
        type: String,
        require: true,
    },
    uniqueServices: {
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
}, { collection: 'typeServices' });

typeServicesSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('TypeServices', typeServicesSchema);
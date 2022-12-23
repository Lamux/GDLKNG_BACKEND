const { Schema, model } = require('mongoose');
const { DateTime, Settings, Info, Zone } = require("luxon");

// Creating a date time object
let date = DateTime.local();

const StaffTypeSchema = Schema({
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        require: true
    },
    name: {
        type: String,
        require: true,
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
}, { collection: 'staffType' });

StaffTypeSchema.method('toJSON', function() {
    const { __v, _id, pass, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('StaffType', StaffTypeSchema);
const { Schema, model } = require('mongoose');
const { DateTime, Settings, Info, Zone } = require("luxon");


// Creating a date time object
let date = DateTime.local();


const HolidayShema = Schema({
    date: {
        type: String,
        require: true,
        unique: true
    },
    day: {
        type: Number
    },
    month: {
        type: Number
    },
    year: {
        type: Number
    },
    nameDay: {
        type: String,
        require: true
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
}, { collection: 'holidays' });

HolidayShema.method('toJSON', function() {
    const { __v, _id,dateCreate,dateUpdate,creatorUser, ...object } = this.toObject();
    return object;
});

module.exports = model('HoliDays', HolidayShema);
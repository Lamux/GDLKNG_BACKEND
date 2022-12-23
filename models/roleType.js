const { Schema, model } = require('mongoose');
const { DateTime } = require("luxon");

// Creating a date time object
let date = DateTime.local();

const RoleTypeShema = Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    category: {
        type: Number,
        require: true,
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
}, { collection: 'roleType' });

RoleTypeShema.method('toJSON', function() {
    const { __v, pass, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('roleType', RoleTypeShema);
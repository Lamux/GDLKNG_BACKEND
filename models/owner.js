const { Schema, model } = require('mongoose');
const { DateTime } = require("luxon");

// Creating a date time object
let date = DateTime.local();


const PropiLocSchema = Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
        unique: true,
    },
    document: {
        type: Number,
        require: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'RoleType',
        require: true       
    },
    terms: {
        type: Boolean,
        default: false
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
}, { collection: 'owners' });

PropiLocSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Owner', PropiLocSchema);
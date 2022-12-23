const { Schema, model } = require('mongoose');
const { DateTime } = require("luxon");

// Creating a date time object
let date = DateTime.local();


const StaffSchema = Schema({
    nit: {
        type: Number,
        min: [9999999, "Minimo 8 Digitos"],
        max: [9999999999, "Maximo 10 Digitos"]
    },
    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    document: {
        type: Number,
        require: true,
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'RoleType',
        require: true        
    },
    typeCollaborator: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'TypeCollaborator',
            require: true
        }]
    },
    staffType: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'StaffType',
        }]
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
    services: [{
        typeService: {
            type: Schema.Types.ObjectId,
            ref: 'servicesParameter',
            required: true,
            unique: true,
        },
        percentage: { type: Number,required: true, },
    }],
    level: {
        type: Number,
        max: [9, "Maximo 1 Digitos"]
    },
    status: {
        type: Boolean,
        default: true
    },
    uniqueStaff: {
        type: String,
        unique: true,
    },
    creatorUser: {
        type: Schema.Types.ObjectId,
        ref: 'businessUsers',
        require: true
    },
    updatingUser: {
        type: Schema.Types.ObjectId,
        ref: 'businessUsers',
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
}, { collection: 'staff' });

StaffSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Staff', StaffSchema);
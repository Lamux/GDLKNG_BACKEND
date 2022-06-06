const { Schema, model } = require('mongoose');
const { DateTime } = require("luxon");

// Creating a date time object
let date = DateTime.local();


const adminlocSchema = Schema ({
    admin: { 
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    imgadmin: {
        type:[{ 
            type: String
        }]
    },
    estadmin: {
        type: Boolean,
        default: true
    },
    usucrea: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    local: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Local',
            require: true
        }]
    },      
    tipcolabora: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Tipocolabora',
        }]
    },
    adminunicoloc: {
        type: String,
        unique:true
    },
    fchcrea: { 
        type: String,
        default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    },
    fchactua: { 
        type: String,
        default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    },
}, { collection: 'adminlocal' });

adminlocSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('AdminLocal', adminlocSchema );
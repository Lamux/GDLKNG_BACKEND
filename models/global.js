const { Schema, model } = require('mongoose');
const { DateTime } = require("luxon");

// Creating a date time object
let date = DateTime.local();


const globalSchema = Schema ({
    globuser: { 
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    imglobuser: {
        type:[{ 
            type: String
        }]
    },
    estaglobuser: {
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
        type: Schema.Types.ObjectId,
        ref: 'Tipocolabora',
        require: true       
    },
    globnunicoloc: {
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
}, { collection: 'globales' });

globalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Globales', globalSchema );
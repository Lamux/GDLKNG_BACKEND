const { Schema, model } = require('mongoose');
const { DateTime } = require("luxon");

// Creating a date time object
let date = DateTime.local();


const colaboradoresSchema = Schema ({
    colabo: { 
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    imgcola: { 
        type: [{
            type: String
        }]
    },
    local: [{
        type: Schema.Types.ObjectId,
        ref: 'Local',
        require: true
    }],
    servicola: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Tipocolabora',
            require: true
        }]
    },
    estacolab: {
        type: Boolean,
        default: true
    },
    colabounico: {
        type: String,
        unique:true
    },
    usucrea: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fchcrea: { 
        type: String,
        default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    },
    fchactua: { 
        type: String,
        default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    },
}, { collection: 'colaboradores' });

colaboradoresSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Colaboradores', colaboradoresSchema );
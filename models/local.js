const { Schema, model } = require('mongoose');
const { DateTime, Settings, Info, Zone   } = require("luxon");

// Creating a date time object
let date = DateTime.local();


const localShema = Schema ({
    nomloc: { 
        type: String,
        require: true
    },
    nitloc: {
        type: Number,
        unique: true,
        require: true,
        min: [8, "Minimo 8 Digitos"]
    },
    celoc: { 
        cel1: Number,
        cel2: Number,
        cel3: Number
    },
    emailoc: { 
        type: String,
        require: true,
    },
    teloc: {
        tel1: Number,
        tel2: Number,
        tel3: Number
    },
    dirloc: {
        type: String,
        require: true,
    },
    servicios: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Servicios',
            require: true
        }]
    },
    imgloc: { 
        type: [{
            type: String
        }],
        max: 3
    },    
    diashabiloc: [{
        type: String,
        require: true
    }],
    hrshabiloc: [{
        hrini: Date,
        hrsin: Date
    }],
    estaloc: {
        type: Boolean,
        default: true
    },
    propiloc: [{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }],
    usucrea: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    fchcrea: { 
        type: String,
        default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    },
    fchactua: { 
        type: String,
        default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    },
}, { collection: 'establecimientos' });

localShema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Local', localShema );
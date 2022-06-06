const { Schema, model } = require('mongoose');
const { DateTime } = require("luxon");

// Creating a date time object
let date = DateTime.local();


const servilocSchema = Schema ({
    local: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Local',
        require: true
    }],
    serviloc: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Servicios',
        require: true
    }],
    tipservi: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Tiposervi',
        require: true
    }],
    // pondremos en este punto el tiempo en minutos del servicio
    timeserviloc:{
        type: Number,
        require: true
    },
    // pondremos en este punto el tiempo en minutos para la biolimpieza
    tmpbioseguridad:{
        type: Number,
        require: true
    },
    // Aqui la hora max para iniciar un servicio, Ej. Titura son 5 hrs no puede iniciar a la 6 pm
    hrmaxiniciserviloc:{
        type: Date
    },
    vlserviloc:{
        type: Number,
        require: true
    },
    colaboserviloc: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Colaborador',
        require: true
    }],
    vlcolaboserviloc:{
        type: Number,
        require: true
    },
    estaserviloc:{
        type: Boolean,
        default: true
    },
    unicoserviloc:{
        type: String,
        unique: true
    },
    usucrea: {
        type: Schema.Types.ObjectId,
        ref: 'AdminLocal'
    },
    fchcrea: { 
        type: String,
        default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    },
    fchactua: { 
        type: String,
        default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    },
}, { collection: 'servicioslocal' });

servilocSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Serviloc', servilocSchema );
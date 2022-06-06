const { Schema, model } = require('mongoose');
const { DateTime } = require("luxon");
// Creating a date time object
let date = DateTime.local();


const tipcolaboraSchema = Schema ({
    tipcolabora: { 
        type: String,
        require: true,
        unique: true
    },
    estausu: {
        type: Boolean,
        default: true
    },
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
}, { collection: 'tipocolaborador' });

tipcolaboraSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Tipocolabora', tipcolaboraSchema );
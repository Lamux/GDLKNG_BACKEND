const { Schema, model } = require('mongoose');
const { DateTime } = require("luxon");
// Creating a date time object
let date = DateTime.local();


const TypeCollaboratorSchema = Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
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
}, { collection: 'typeCollaborators' });

TypeCollaboratorSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('TypeCollaborator', TypeCollaboratorSchema);
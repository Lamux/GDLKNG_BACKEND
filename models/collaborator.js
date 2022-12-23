const { Schema, model } = require('mongoose');
const { DateTime } = require("luxon");

// Creating a date time object
let date = DateTime.local();


const CollaboratorSchema = Schema({
    collaborator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    document: {
        type: Number,
        require: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'roleType',
        require: true
    },
    typeCollaborator: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'TypeCollaborator',
            require: true
        }]
    },
    nit: {
        type: Number,
        require: true,
        min: [9999999, "Minimo 8 Digitos"],
        max: [9999999999, "Maximo 10 Digitos"],
    },
    businessName: {
        type: String,
        require: true
    },
    business: {
        type: Schema.Types.ObjectId,
        ref: 'Business',
        require: true
    },
    collaboratorUnique: {
        type: String,
        require: true,
        unique: true
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
}, { collection: 'collaborators' });

CollaboratorSchema.method('toJSON', function() {
    const { __v, _id, pass, ...object } = this.toObject();
    return object;
});

module.exports = model('Collaborator', CollaboratorSchema);
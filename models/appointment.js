const { Schema, model } = require('mongoose');
const { DateTime, Settings, Info, Zone } = require("luxon");


// Creating a date time object
let date = DateTime.local();

const appointmentSchema = Schema({
    user: {
        userID:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        nomUser:{
            type: String,
            require: true
        },
        apeUser:{
            type: String,
            require: true
        },
        emailUser:{
            type: String,
            require: true
        },
        movilUser:{
            type: Number,
            require: true
        },
    },
    business:{
        business: {
            type: Schema.Types.ObjectId,
            ref: 'Business',
            require: true
        },
        nameBusiness:{
            type: String,
            require: true
        },
        telBusiness:{
            type: Number,
            require: true
        },
        celBusiness:{
            type: Number,
            require: true
        },
        dirBusiness:{
            type: String,
            require: true
        },
        geoLocalitationBusiness:{
            lat: {type: String},
            lon: {type: String}
        },
    },
    services: [{
        ServicesParameter: {
            type: Schema.Types.ObjectId,
            ref: 'ServicesParameter',
            require: true
        },
        nameService:{
            type: String,
            require: true
        },
        nameTypeService:{
            type: String,
            require: true
        },
        servicePrice:{
            type: Number,
            require: true
        },
        serviceTime:{
            type: Number,
            require: true
        },
        biocleaning:{
            type: Number,
            require: true
        },
        statusCollaborator:{
            type: Boolean,
            default: false
        },
        statusUser:{
            type: Boolean,
            default: false
        },
    }],
    staffServices:[{
        staff: {
            type: Schema.Types.ObjectId,
            ref: 'staff',
            require: true
        },
        nameCollaborator:{
            type: String,
            require: true
        },
        staffType: {
            type: Schema.Types.ObjectId,
            ref: 'staffType',
            require: true
        }
    }],
    appointmentDate:[{
        dateService:{
            type: String,
            require: true
        },
        timeService:{
            type: String,
            require: true
        },
        endOfService:{
            type: String,
            require: true
        },
        status:{
            type: Boolean,
            default: true
        },
        //TODO: Esta informacion se llenara cuando el Manager cree una cita o la edite.
        businessCreatedAppointment:[{
            creatorBusiness: {
                type: Schema.Types.ObjectId,
                ref: 'staff',
            },
            UpdateBusiness: {
                type: Schema.Types.ObjectId,
                ref: 'staff',
            },
            dateCreateBusiness: {
                type: String,
                default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
            },
            dateUpdateBusiness: {
                type: String,
                default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
            },
        }],
        //TODO: Esta informacion se llenara cuando el Usuario edite la cita.
        userEditAppointment:[{
            dateCreateUser: {
                type: String,
                default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
            },
            dateUpdateUser: {
                type: String,
                default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
            },
        }],
        dateCreate: {
            type: String,
            default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
        },
        dateUpdate: {
            type: String,
            default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
        },
    }],
    appointmentControlObservations:[{
        userObservations: {
            type: String,
        },
        managerObservations: {
            type: String,
        },
        collaboratorObservations: {
            type: String,
        },
    }],
    appointmentStatus:{
        type: String,
        require: true
    },
    //TODO: Para Realizar la calificación del servicio debe haber cerrado el proceso del servicio.
    staffRating:[{
        questionOne:{
            type: String,
        },
        ratingOne:{
            type: Number,
            min:[1,"Calidicación de 1 a 5"],
            max:[5,"Calidicación de 1 a 5"]
        },
        questionTwo:{
            type: String,
        },
        ratingTwo:{
            type: Number,
            min:[1,"Calidicación de 1 a 5"],
            max:[5,"Calidicación de 1 a 5"]
        },
        questionThree:{
            type: String,
        },
        ratingThree:{
            type: Number,
            min:[1,"Calidicación de 1 a 5"],
            max:[5,"Calidicación de 1 a 5"]
        },
        dateCreate: {
            type: String,
            default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
        },
    }],
    userRating:[{
        questionOne:{
            type: String,
        },
        ratingOne:{
            type: Number,
            min:[1,"Calidicación de 1 a 5"],
            max:[5,"Calidicación de 1 a 5"]
        },
        questionTwo:{
            type: String,
        },
        ratingTwo:{
            type: Number,
            min:[1,"Calidicación de 1 a 5"],
            max:[5,"Calidicación de 1 a 5"]
        },
        questionThree:{
            type: String,
        },
        ratingThree:{
            type: Number,
            min:[1,"Calidicación de 1 a 5"],
            max:[5,"Calidicación de 1 a 5"]
        },
        dateCreate: {
            type: String,
            default: date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
        },
    }]
}, { collection: 'appointments' });

appointmentSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('appointment', appointmentSchema);
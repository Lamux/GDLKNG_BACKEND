const { response } = require('express');
const { DateTime, Settings, Info, Zone,Interval,Duration  } = require("luxon");
const servicesParameter = require('../models/servicesParameter');
const appointment = require('../models/appointment');
const business = require('../models/business');
// Creating a date time object
let date = DateTime.local();
let now = DateTime.local().toMillis();
// let currentTime = DateTime.now().toFormat('H');
// let moment = DateTime.now().toFormat('D TT'); // tenemos el formato completo de la hora 19/12/2022 19:08:53

const TimeControl = async(req, res = response, next) => {
    console.log("fecha actual: " + now);
    console.log("Zona Horaria: " + date.zoneName);
};

const validationAndTimeControl = async(req, res = response, next) => {
    // Valida que la hora de agenda no sea menor que la fecha actual
    const fec = DateTime.fromFormat(req.body.dateService +" "+ req.body.timeService, "dd/LL/yyyy TT").ts;
    if( fec < now ){
        return res.status(418).json({
            ok: false,
            msg: 'time less than current date MW-GT01'
        });        
    } else {
        next();
    }
};
const validationAndTimeControlBusiness = async(req, res = response, next) => {
    // Valida que la hora de agenda este en el rango de horas laborales
    const bus = req.body.business;
    let Yar = DateTime.fromFormat(req.body.dateService +" "+ req.body.timeService, "dd/LL/yyyy TT").year;
    let Mes = DateTime.fromFormat(req.body.dateService +" "+ req.body.timeService, "dd/LL/yyyy TT").month;
    let Dai = DateTime.fromFormat(req.body.dateService +" "+ req.body.timeService, "dd/LL/yyyy TT").day;
    let DiaSem = DateTime.local(Yar,Mes,Dai).weekday;
    
    const BusinessDB = await business.findById(bus).where('status').equals(true);
    
    try {
        RangoFueraHorario = await BusinessDB.daysServices.forEach( function(dato) { 
            if(dato.dayNumber === DiaSem){ 
                if( req.body.timeService < dato.startTime || req.body.timeService >= dato.endTime){
                    return res.status(418).json({
                        ok: false,
                        msg: 'outside of business hours MW-GT02'
                    });  
                } else {
                    next();
                }
                
            }          
        });     
    } catch (error) {
        return res.status(418).json({
            ok: false,
            msg: 'outside of business hours MW-GT03'
        }); 
    }      
};

//TODO: validamos que el colaborador tenga disponible en el rango de tiempo
const validRangeOfHours = async(req, res = response, next) => {
    const Staffservice = req.body.staffService;
    const dateAppoinment = req.body.dateService;
    const timeAppoinment = req.body.timeService;

    // Consulta al colaborador si tiene asignacion de agendas previas para no pisar el mismo rango de tiempo
    const collaValidation = await appointment.find({'staffServices.staff': Staffservice})
                                .where('appointmentDate.status').equals(true)
                                .where('appointmentDate.dateService').equals(dateAppoinment)
                                .where('appointmentDate.timeService').sort({timeService:1});

    // const horaIni = after( hrs,appCollaborator[0].serviceTime);
    // const hi = DateTime.fromISO(timeAppoinment).plus({minute: (appCollaborator[0].serviceTime + appCollaborator[0].biocleaning)}).toFormat('T');
    
    try {
        let IniMax = "";
        let FinMax = "";
        let f1 = DateTime.fromFormat(req.body.dateService +" "+ req.body.timeService, "dd/LL/yyyy TT");
        let f2 = DateTime.fromFormat(req.body.dateService +" "+ req.body.timeService, "dd/LL/yyyy TT");
        
        for (let item of collaValidation) {
            // console.log(item.appointmentDate);
            const horaIniMax = "";
            const horaFinMax = "";
            // TODO: Del Array tomamos la hora 
            if(horaIniMax != item.appointmentDate[0].timeService){
                IniMax = item.appointmentDate[0].timeService;
                if(horaFinMax != item.appointmentDate[0].endOfService){
                    FinMax = item.appointmentDate[0].endOfService;
                    f2 = DateTime.fromFormat(item.appointmentDate[0].dateService +" "+ item.appointmentDate[0].timeService, "dd/LL/yyyy TT");
                }
            }
        }
        // console.log("Hora de Inicio: "+IniMax);
        // console.log("Hora de Fin: "+FinMax);
        // console.log(timeAppoinment +" >="+ IniMax +" -- "+ timeAppoinment +" <= "+ FinMax);
        // console.log(f1.diff(f2,['minutes']).toObject().minutes);    

        // TODO: VALIDAMOS QUE MINIMO HALLA 25 MIN ENTRE HORA INICIO CONTRA PROXIMA CITA
        if( f1.diff(f2,['minutes']).toObject().minutes >= -25 && f1.diff(f2,['minutes']).toObject().minutes < 0 ){
            return res.status(418).json({
                ok: false,
                msg: 'Time Range Reserved MW-GT04'
            });
        } else if ( timeAppoinment >= IniMax && timeAppoinment <= FinMax) {
            return res.status(418).json({
                ok: false,
                msg: 'Time Range Reserved MW-GT05'
            });
        }else {
            next();
        }
    } catch (error) {
        return res.status(418).json({
            ok: false,
            msg: 'appointment scheduling error MW-GT06'
        }); 
    }
};



module.exports = {
    TimeControl,
    validationAndTimeControl,
    validRangeOfHours,
    validationAndTimeControlBusiness,
};
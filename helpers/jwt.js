 const jwt = require('jsonwebtoken');



 const generarJWT = (uid) => {

     return new Promise((resolve, reject) => {

         const payload = {
             uid
         }

         jwt.sign(payload, process.env.JWT_SECRET, {
             expiresIn: '30d'
         }, (err, token) => {
             if (err) {
                 console.log(err);
                 reject('No se puede Generar el JWT');
             } else {
                 resolve(token);
             }
         });
     });
 };


 module.exports = {
     generarJWT,
 };
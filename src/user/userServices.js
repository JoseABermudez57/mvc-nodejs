const userModel = require('./userModel');
const key = 'somekey234567884456753456';
const encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {

   return new Promise(function myFn(resolve, reject) {
       const userModelData = new userModel();

       userModel.find({email: userDetails.email}, function getresult(errorvalue, result){
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         } else {
            if(result !=undefined &&  result !=null) {
               if(result.length != 1) {
                  userModelData.firstname = userDetails.firstname;
                  userModelData.lastname = userDetails.lastname;
                  userModelData.email = userDetails.email;
                  userModelData.password = userDetails.password;
                  let encrypted = encryptor.encrypt(userDetails.password);
                  userModelData.password = encrypted;

                  userModelData.save(function resultHandle(error, result) {
                     if (error) {
                           reject({status: false,msg: "Error al crear usuario"});
                     } else {
                           resolve({status: true,msg: "Usuario creado"});
                     }
                  });
               }
               else {
                  reject({status: false,msg: "Correo ya usado"});
               }
            }
            else {
               reject(false);
            }  
         }
       })

   });
}

module.exports.loginuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               let decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  reject({status: false,msg: "Falla en validacion de usuario"});
               }
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}

module.exports.searchUserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({firstname: userDetails.firstname}, function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               resolve({status: true});
            }
            else {
               reject({status: false});
            }
         }
      });
   })
}

module.exports.deleteUserDBService = (userDetails) => {
   return new Promise((resolve, reject) => {
      userModel.findOneAndDelete({email: userDetails.email}, (errorvalue, result) => {
         if(errorvalue){
            reject({status: false, msg: "Datos invalidos"});
         } else {
            if(result != undefined && result != null) {
               resolve({status: true, msg: "Usuario eliminado"});
            } else {
               reject ({status: false, msg: "Usuario no encontrado"})
            }
         }
      })
   })
}

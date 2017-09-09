module.exports = {
   hasCorrectPassword: function(email, password) {
     return new Promise(function(resolve, reject){
       User.findOne({email: email})
         .then(function(user){
           if(!user){
             return reject();
           }

           CipherService.compareHash(password, user.password)
             .then(function(){
               resolve(user);
             }).catch(function(error){
               reject(error)
             })
         })

     });
   },

   createSession: function(user){
     let sessionId = CipherService.generateSessionId();
     return Session.create({
       user: user.id,
       id: sessionId,
     });
   }

};
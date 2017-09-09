var bcrypt = require('bcrypt');
const crypto = require('crypto');


module.exports = {

  /**
   * Hash the password field of the passed user.
   */
  hashPassword: function (user) {
    return new Promise(function(resolve, reject){
      bcrypt.genSalt(10, function(err, salt) {
        if (err) return reject(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return reject(err);

          user.password = hash;
          resolve(user);
        });
      });
    });
  },

  /**
   * Compare password hashes to decide if auth was successful or not
   */
  compareHash: function(password, hash) {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, hash, function (err, res) {
        if(err) {
          console.log(err);
          reject();
        } else if (!res) {
          reject(Error("Password does not match hash"));
        } else {
          resolve();
        }
      });
    });
  },

  generateSessionId: function(){
    let sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    return sha.digest('hex');
  }

};
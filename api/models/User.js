/**
 * User.js
 *
 * @description :: This represents a user in the system.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    firstname: {
      type: 'string',
      required: 'true',
    },
    surname: {
      type: 'string',
      required: 'true',
    },
    password: {
      type: 'string',
      minLength: 10,
      required: true,
    },
    email: {
      type: 'string',
      unique: true,
      index: true,
      required: true,
    },
    session: {
      collection: 'session',
      via: 'user'
    },
    toJSON: function(){
      const obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeValidate: function(user, cb){
    cb();
  },
  beforeCreate: function(user, cb) {
    CipherService.hashPassword(user)
      .then(function(user){
        cb();
      })
      .catch(err => cb(err));
  },
}
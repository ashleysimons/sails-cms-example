/**
 * Session.js
 *
 * @description :: This represents a Session in the system.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    id: {
      type: 'string',
      unique: true,
      index: true,
      required: true,
    },
    user: {model: 'user'},
  },

}


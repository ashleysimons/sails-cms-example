/**
 * Page.js
 *
 * @description :: This represents a Page in the system.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    title: {
      type: 'string',
      index: true
    },
    summary: {
      type: 'string',
    },
    content: {
      type: 'string',
    },
  },
}


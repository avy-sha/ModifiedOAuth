/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
//isme saare users aayege including resource owners and clients
module.exports = {

  attributes: {
    userId:{
      primaryKey: 'hash',
      type: 'string',
      required: true
    },

    password:{
      type:"string",
      required: true
    }

  },
  comparePassword: function(password, user, cb) {
    if (password == user.password) {
      cb(null, true);
    } else {
      cb("not equal");
    }
  }
};


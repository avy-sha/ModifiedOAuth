/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    email:{
      type: 'string',
      required: true
    },
    scopes:{
      type: 'string',
      required: true,
      enum: ["admin","executive","user"]
    },
    alottedKey:{
      type:"string",
      required: true
    }
  }
};


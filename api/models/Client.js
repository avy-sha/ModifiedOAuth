/**
 * Client.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
//details about registered clients.
module.exports = {

  attributes: {
    scopes:{
      type: 'string',
      required: true,
      enum: ["admin","executive","user"]
    },
  }
};


/**
 * Client.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
//details about registered clients.
module.exports = {

  attributes: {
    userId:{
      primaryKey: 'hash',
      type: 'string',
      required: true
    },
    name:{
      type:'string'
    },
    scopes:{
      type: 'string',
      required: true,
      enum: ["admin","exec","basic"]
    },
    redirectURI:{
      type: 'string',
      required: true
    },
    domain:{
      type: 'string',
      required: true
    },
    clientId:{
      type: 'string',
      required: true
    },
    clientSecret:{
      type: 'string',
      required: true
    },
    privateURI:{
      type: 'string'
    }
  }
};


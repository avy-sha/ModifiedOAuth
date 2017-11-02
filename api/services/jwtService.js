/**
 * Created by Abhinav on 12-09-2017.
 */
/**
 * @module jwtService
 */

var
  jwt = require('jsonwebtoken'),
  tokenSecret = "hailall";

// Generates a token from supplied payload
/**
 * Generates a token from supplied payload
 * @param {object} payload - payload to be included in the jwt.
 * @returns {object} returns a signed JSON Web Token with an expiration time of 8 hours.
 */
module.exports.issue = function(payload) {
 payload.iat = Date.now();
 payload.exp = payload.iat+86400000;
  return jwt.sign(
    payload,
    tokenSecret
  );
};
module.exports.randomIssue = function(payload,timeDiff) {
  payload.iat = Date.now();
  payload.exp = payload.iat+timeDiff;
  return jwt.sign(
    payload,
    tokenSecret
  );
};
/**
 * Verifies token on a request
 * @param {object} token - jwt which is to be verified
 * @param {object} callback - any callback which is to be called after verification.
 */
// Verifies token on a request
module.exports.verify = function(req,token, callback) {
 // callback(new Error({err: 'Format is Authorization: Bearer [token]'}));
  if(token){}
  else if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
       return callback('Format is Authorization: Bearer [token]');
    }
  } else if (req.param('token')) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return callback('Format is Authorization: Bearer [token]');
  }
 jwt.verify(token, tokenSecret, {}, function(err,token){
    if (err) return callback('invalid Token');
    //console.log(token);
    return callback("",token);
    }//Pass errors or decoded token to callback
  );
};

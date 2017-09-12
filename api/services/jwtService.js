/**
 * Created by Abhinav on 12-09-2017.
 */
/**
 * @module jwtService
 */

var
  jwt = require('jsonwebtoken'),
  tokenSecret = "hailall"; //

// Generates a token from supplied payload
/**
 * Generates a token from supplied payload
 * @param {object} payload - payload to be included in the jwt.
 * @returns {object} returns a signed JSON Web Token with an expiration time of 8 hours.
 */
module.exports.issue = function(payload) {
  return jwt.sign(
    payload,
    tokenSecret, // Token Secret that we sign it with
    {
      expiresIn: 28800 //8hours Token Expire time
    }
  );
};
/**
 * Verifies token on a request
 * @param {object} token - jwt which is to be verified
 * @param {object} callback - any callback which is to be called after verification.
 */
// Verifies token on a request
module.exports.verify = function(token, callback) {
  return jwt.verify(
    token, // The token to be verified
    tokenSecret, // Same token we used to sign
    {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    callback //Pass errors or decoded token to callback
  );
};

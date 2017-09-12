/**
 * Created by Abhinav on 12-09-2017.
 */
var
  jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  var token;

  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.json(401, {err: 'Format is Authorization: Bearer [token]'});
    }
  } else if (req.param('token')) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;

  } else {
    return res.json(401, {err: 'No Authorization header was found'});
  }

  jwtService.verify(token, function (err, token) {

    if (err) return res.json(401, {err: 'Invalid Token!'});
    //console.log(token);

    if((Math.floor(token.exp-token.iat)/1000)<=5000){
      token=jwtService.issue({ id: token.id });
      res.json({token:token});
    }
    var decoded = jwt.decode(token);
    console.log(decoded);
    req.token = decoded; // This is the decrypted token or the payload you provided
    next();
  });
};

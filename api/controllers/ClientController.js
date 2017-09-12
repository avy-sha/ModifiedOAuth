/**
 * ClientController
 *
 * @description :: Server-side logic for managing Clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  auth: function(req, res) {

    var userId = req.param('userId');
    var password = req.param('password');

    if (!userId || !password) {
      return res.json(401, { err: 'email and password required' });
    }

    User.findOne({ userId: userId }, function(err, user) {
      if (!user) {
        return res.json(401, { err: 'user not registered' });
      }

      User.comparePassword(password, user, function(err, valid) {
        if (err) {
          return res.json(403, { err: 'forbidden' });
        }

        if (!valid) {
          return res.json(401, { err: 'invalid email or password' });
        } else {

          res.json({
            token: jwtService.issue({ id: user.email })});
        }
      });
    })
  },

  register : function( req , res ) {
    var name = req.param("name");
    var type = req.param("type"); //enum type web app or user agent....
    var scopes = req.param("scopes");
    var redirectURI = req.param("redirectURI");

  }

};


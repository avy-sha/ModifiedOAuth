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
      return res.json(401, { err: 'userId and password required' });
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
          return res.json(401, { err: 'invalid UserId or password' });
        } else {
          res.json({
            token: jwtService.issue({ id: userId })});
        }
      });
    })
  }



};


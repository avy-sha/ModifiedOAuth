/**
 * GetDataController
 *
 * @description :: Server-side logic for managing getdatas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getData: function(req,res){
    var accessToken = req.param("accessToken");
    var clientId = req.param("clientId");
    var token = req.param("token");
    jwtService.verify(req, "", function (err, token) {
      if (err) {
        return res.json({err: err});
      }
      jwtService.verify("", accessToken, function (err, access) {
        if (err) {
          return res.json({err: err});
        }
        if(access.id!=token.id){
          return res.json({err: "users do not match."});
        }
        if(access.clientId!=clientId){
          return res.json({err: "client ids do not match."});
        }
        User.findOne({ userId: token.id }, function(err, user) {
          if (!user) {
            return res.json(401, { err: 'user not registered' });
          }
        delete user.password;
        delete user.updatedAt;
        return res.json(200,user);
        })
      })
    })
  }
};


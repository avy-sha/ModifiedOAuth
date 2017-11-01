/**
 * RegisterServerUserController
 *
 * @description :: Server-side logic for managing registerserverusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	registerUser:function(req,res){
    var userId = req.param('userId');
    var password = req.param('password');
    if (!userId || !password) {
      return res.json(401, { err: 'userId and password required' });
    }
    User.findOne({ userId: userId }, function(err, user) {
      if (user) {
        return res.json(401, { err: 'user already exists.Its password is :'+user.password });
      }
      else{
        user = {};
        user.userId = userId;
        user.password = password;
        User.create(user,function (err,user) {
          if (err)
            return res.serverError(err);
          console.log('new user has been created');
          res.json(200,{"info":"new user has been created"});
        });
      }
    })

  }
};


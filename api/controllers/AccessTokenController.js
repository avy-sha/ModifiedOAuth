/**
 * AccessTokenController
 *
 * @description :: Server-side logic for managing Accesstokens
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  generateToken: function (req, res) {

var authCode = req.param("authCode");
var clientId = req.param("clientId");
var clientSecret = req.param("clientSecret");
var redirectURI =  req.param("redirectURI");
var token=req.param("token");
    jwtService.verify(req, "", function (err, token) {
      if (err) {
        return res.json({err: err});
      }
      jwtService.verify("", authCode, function (err, authToken){
        if (err) {
          return res.json({err: err});
        }
        if(authToken.clientId!=clientId){
          return res.json({err: "client ids do not match."});
        }
        if(authToken.id!=token.id){
          return res.json({err: "user ids do not match."});
        }
        Client.find({clientId: clientId}, function (err, client) {

          if (err) {
            console.log(err);
            return res.serverError(err);
          }

          if (!client[0]) {
            return res.status(404).json({err: "Invalid ClientId"});
          }
          if (client[0].redirectURI != redirectURI)
            return res.status(400).json({err: "redirect uri not same as registered redirect uri"});
          if(client[0].clientSecret != clientSecret)
            return res.status(400).json({err: "Unable to authenticate client application."});
          return res.view('redirect',{url:"http://"+client[0].redirectURI+"?accessToken="+jwtService.randomIssue({ id: token.id ,clientId:clientId,scopes:client[0].scopes},14400000),token:token});
        })
      });
    });
  }
};


/**
 * AuthorisationCodeController
 *
 * @description :: Server-side logic for managing authorisation codes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getCodeAuth:function(req,res){
    var clientId = req.param("clientId");
    var redirectURI = req.param("redirectURI");
    return res.view('resourceownerAuthentication',{clientId:clientId,redirectURI:redirectURI});
  },
  //Only for authorisation code grant.
  requestPermission:function (req,res){
    var clientId = req.param("clientId");
    var redirectURI = req.param("redirectURI");
    var token = req.param("token");
    jwtService.verify(req, res, function (err, token1) {
        if (err) {
          return res.json({err: err});
        }
      return res.view('resourceownerPermission',{userId:token1.id,clientId:clientId,redirectURI:redirectURI,token:token});
    })
  },
  generateCode: function (req, res) {
    var clientId = req.param("clientId");
    var redirectURI = req.param("redirectURI");
    var token = req.param("token");
    if(!token){
      return res.json(400, {"err": "Permission denied"});
    }
    if (!clientId || !redirectURI) {
      return res.json(400, {"err": "invalid number of parameters."});
    }
    jwtService.verify(req, res, function (err, token1) {
      if (err) {
        return res.json({err: err});
      }
      Client.findOne({clientId: clientId}, function (err, client) {

        if (err) {
          console.log(err);
          return res.serverError(err);
        }

        if (!client) {
          return res.status(404).json({err: "Invalid ClientId"});
        }
        else {
          if (client.redirectURI != redirectURI)
            return res.status(400).json({err: "redirect uri not same as registered redirect uri"});
          return res.view('redirect',{url:"http://"+client.redirectURI+"?authCode="+jwtService.issue({ id: token1.userId ,clientId:clientId,scopes:client.scopes}),token:token});
        }

      })
    })
  }
};

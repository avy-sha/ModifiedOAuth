/**
 * AuthorisationCodeController
 *
 * @description :: Server-side logic for managing authorisation codes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var conf = require('../../config/conf.json');

module.exports = {

  getCodeAuth:function(req,res){
    var clientId = req.param("clientId");
    var redirectURI = req.param("redirectURI");

    return res.view('resourceownerAuthentication',{clientId:clientId,redirectURI:redirectURI,domain:conf.domain});
  },
  //Only for authorisation code grant.
  requestPermission:function (req,res){
    var clientId = req.param("clientId");
    var redirectURI = req.param("redirectURI");
    var token = req.param("token");
    jwtService.verify(req, "", function (err, token1) {
        if (err) {
          return res.json({err: err});
        }
        jwtService.verify("", clientId, function (err, client) {
          if (err) {
            return res.json({err: "Invalid ClientId"});
          }
          return res.view('resourceownerPermission',{clientName:client.name,userId:token1.id,clientId:clientId,redirectURI:redirectURI,token:token,domain:conf.domain});
    })})
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
    jwtService.verify(req, "", function (err, token1) {
      if (err) {
        return res.json({err: err});
      }
      Client.find({clientId: clientId}, function (err, client) {

        if (err) {
          console.log(err);
          return res.serverError(err);
        }

        if (!client[0]) {
          return res.status(404).json({err: "Invalid ClientId"});
        }
        else {
          if (client[0].redirectURI != redirectURI)
            return res.status(400).json({err: "redirect uri not same as registered redirect uri"});
          return res.view('redirect',{url:"http://"+client[0].redirectURI+"?authCode="+jwtService.randomIssue({ id: token1.userId ,clientId:clientId,scopes:client[0].scopes},1440000),token:token});
        }

      })
    })
  }
};


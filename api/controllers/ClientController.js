/**
 * ClientController
 *
 * @description :: Server-side logic for managing Clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');

module.exports = {

  register: function (req, res) {
    jwtService.verify(req, "", function (err, token) {
      if (err) {
        return res.json({err: err});
      }
      var userId = token.id;
      var name = req.param("appName");
      var domain = req.param("domain");
      var type = req.param("type"); //enum type web app or user agent....
      var scopes = req.param("scopes");
      var redirectURI = req.param("redirectURI");

      if (!redirectURI)
        return res.json({err: "RedirectURI is necessary!!"});

      if (extractHostname(redirectURI) != domain) {
        return res.json({err: "RedirectURI should be of same domain"});
      }
      if (type == "public" || type == "private") {
        Client.findOne({userId: userId}).exec(function (err, client) {

          if (err) {
            console.log(err);
            return res.serverError(err);
          }
          /*if(client){
            return res.status(409).json({err:"the user already has a project"});
          }*/
          client = {};
          client.userId = userId;
          client.scopes = scopes;
          client.name = name;
          client.domain = domain;
          client.redirectURI = redirectURI;

              client.clientId = jwtService.issue({ name: name , scopes:scopes});
              bcrypt.genSalt(12, function (err, salt) {
                bcrypt.hash((Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER) + Date.now())) + Date.now().toString() + "OSKbPIYzdbFiXRj/", salt, function (err, clientSecret) {
                  client.clientSecret = clientSecret;
                  if (type == "private") {
                    Client.create(client).exec(function (err, Client) {
                      if (err) {
                        console.log(err);
                        return res.serverError(err);
                      }
                      res.status(200).json({
                        userId: userId,
                        scopes: scopes,
                        clientId: client.clientId,
                        clientSecret: clientSecret
                      });
                    });
                  }
                  else if (type == "public") {
                    bcrypt.genSalt(12, function (err, salt) {
                      bcrypt.hash((Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER) + Date.now())) + Date.now().toString() + "O23@bPIYzdbFiXRj/", salt, function (err, privateURI) {
                        client.privateURI = privateURI;
                        Client.create(client).exec(function (err, Client) {
                          if (err) {
                            console.log(err);
                            return res.serverError(err);
                          }
                          res.status(200).json({
                            userId: userId,
                            scopes: scopes,
                            clientId: client.clientId,
                            clientSecret: clientSecret,
                            privateURI: privateURI
                          });
                        });
                      })
                    })
                  }
                });
              })
            })
      }
    });
  }
};

function extractHostname(url) {
  var hostname;
  if (url.indexOf("://") > -1) {
    hostname = url.split('/')[2];
  }
  else {
    hostname = url.split('/')[0];
  }
  hostname = hostname.split(':')[0];
  hostname = hostname.split('?')[0];
  return hostname;
}

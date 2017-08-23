/**
 * ApiKeyController
 *
 * @description :: Server-side logic for managing apikeys
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
//this apikey is currently being generated from the authorisation server but it can also be generated directly from resource owner.
//the key allotted here will be used to acquire access token.

  generateApiKey: function (req, res) {
    var email = req.param("email");
    var scope = req.param("scope");
    //scope can be of enum types.
    //The use of Scope in an OAuth2 application ised from  often key to proper permissioning. Scope is used to limit the authorization granted to the client by the resource owner
    //will depend on the type of application using the OAuth module.
    scope = "admin";
    email = "abhinav@gmail.com";

    //TODO: Notify the frontend to tell the user that the allotted api key will be only displayed once per email(and once scopes allotted cannot be changed for a specific email)

    var key = apiKeyService.encryptApiKey(scope, email);
    User.findOne({email: email}, function (err, user) {

      if (err) {
        console.log(err);
        return res.serverError(err);
      }

      if (user) {
        return res.status(409).json({err: "conflict:User already exists"});
      }
      else {
        user = {};
        user.email = email;
        user.scope = scope;
        user.key = key;
        user.save(function (err) {
          if (err)
            return res.serverError(err);
          console.log('new user has been created');
        });
        res.status(200).json({email: email, scope: scope, key: key});
      }

    })
  }
};


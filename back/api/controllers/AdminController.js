/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function(req, res){
    Admin.create({user: req.body.user, password: req.body.password}, function(err, user){
      if (err) res.json({ error: 'Error'}, 500);
      res.json(user);
    });
  },
	login: function(req, res){
    var bcrypt = require('bcrypt');
    Admin.findOne({user: req.body.user}).exec(function (err, user) {
      if (err) res.json({ error: 'DB error' }, 500);

      if (user) {
        bcrypt.compare(req.body.password, user.password, function (err, match) {
          if (err) res.json({ error: 'Server error' }, 500);

          if (match) {
            req.session.authenticate_admin = true;
            Collection.list(function(collections){
              var c = [];
              for(var i = 0, size = collections.length; i < size; i++){
                var aux = collections[i].name.split(".")[1];
                if (aux !== "system") { c.push(aux) };
              }
              res.json({collections: c, prueba: "prueba"});
            });
          } else {
            // invalid password
            if (req.session.user){
              req.session.user = null;
            }
            res.json({ error: 'Invalid password' }, 400);
          }
        });
      } else {
        Admin.find({}).exec(function (err, users){
          res.json({ error: 'User Invalid' }, 400);
        });
      }
    });
  },
  index: function(req, res){
    Collection.list(function(collections){
      var c = [];
      for(var i = 0, size = collections.length; i < size; i++){
        var aux = collections[i].name.split(".")[1];
        if (aux !== "system") { c.push(aux) };
      }
      res.view("admin_index", {collections: c, prueba: "prueba"});
    });
  }
};


/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Emailaddresses = require('machinepack-emailaddresses');
var Passwords = require('machinepack-passwords');
var Gravatar = require('machinepack-gravatar');

module.exports = {

  signup: function(req, res) {

    if (_.isUndefined(req.param('email'))) {
      return res.badRequest('An email address is required!');
    }

    if (_.isUndefined(req.param('password'))) {
      return res.badRequest('A password is required!');
    }

    if (req.param('password').length < 6) {
      return res.badRequest('Password must be at least 6 characters!');
    }

    if (_.isUndefined(req.param('username'))) {
      return res.badRequest('A username is required!');
    }

    // username must be at least 6 characters
    if (req.param('username').length < 6) {
      return res.badRequest('Username must be at least 6 characters!');
    }

    // Username must contain only numbers and letters.
    if (!_.isString(req.param('username')) || req.param('username').match(/[^a-z0-9]/i)) {
      return res.badRequest('Invalid username: must consist of numbers and letters only.');
    }

    Emailaddresses.validate({
      string: req.param('email'),
    }).exec({
      // An unexpected error occurred.
      error: function(err) {
        return res.serverError(err);
      },
      // The provided string is not an email address.
      invalid: function() {
        return res.badRequest('Doesn\'t look like an email address to me!'); 
      },
      // OK.
      success: function() { 
        Passwords.encryptPassword({
          password: req.param('password'), 
        }).exec({

          error: function(err) {
            return res.serverError(err); 
          },

          success: function(result) {

            var options = {};

            try {

              options.gravatarURL = Gravatar.getImageUrl({
                emailAddress: req.param('email') 
              }).execSync();

            } catch (err) {
              return res.serverError(err); 
            }

            options.email = req.param('email');
            options.username = splitUsername;
            options.encryptedPassword = result;
            options.deleted = false;
            options.admin = false;
            options.banned = false;

            User.create(options).exec(function(err, createdUser) {
              if (err) {
                console.log('the error is: ', err.invalidAttributes);

                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {

                  // return res.send(409, 'Email address is already taken by another user, please try again.');
                  return res.alreadyInUse(err);
                }

                if (err.invalidAttributes && err.invalidAttributes.username && err.invalidAttributes.username[0] && err.invalidAttributes.username[0].rule === 'unique') {

                  // return res.send(409, 'Username is already taken by another user, please try again.');
                  return res.alreadyInUse(err);
                }

                return res.negotiate(err);
              }

              req.session.userId = createdUser.id;

              return res.json(createdUser);
            });
          }
        });
      }
    });
  },

  login: function(req, res){
    User.findOne({
      or: [
      { email: req.param('email') },
      { username: req.param('username') }
      ]
    }, function foundUser(err, createdUser){
      if(err) return res.negotiate(err);
      if(!createdUser) res.notFound();

      Passwords.checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: createdUser.encryptedPassword
      }).exec({
        error: function(err){
          return res.negotiate(err);
        },

        incorrect: function(err){
          return res.notFound();
        },

        success: function(){
          if(createdUser.deleted){
            return res.forbidden("'Your account has been deleted. Please visit http://brushfire.io/restore to restore your account.'");
          }

          if(createdUser.banned){
            return res.forbidden("'Your account has been banned, most likely for adding dog videos in violation of the Terms of Service. Please contact Chad or his mother.");
          }

          req.session.userId = createdUser.id;

          return res.ok();
        }
      });
    });
  },

  logout: function(req, res){
    if(req.session.userId) return res.redirect('/');

    User.findOne('req.session.userId', function foundUser(err, user){
      if(err) return res.negotiate(err);

      if(!user){
        sails.log.verbose('Session refers to a user who no longer exists.');
      }

      req.session.userId = null;

      return res.redirect('/');
    });
  },

  profile: function(req, res) {

    // Try to look up user using the provided email address
    User.findOne(req.param('id')).exec(function foundUser(err, user) {
      // Handle error
      if (err) return res.negotiate(err); 

      // Handle no user being found
      if (!user) return res.notFound(); 

      // Return the user
      return res.json(user); 
    });
  },

  delete: function(req, res) {

    if (!req.param('id')) { 
      return res.badRequest('id is a required parameter.');
    }

    User.destroy({ 
      id: req.param('id')
    }).exec(function(err, usersDestroyed) {
      if (err) return res.negotiate(err); 
      if (usersDestroyed.length === 0) { 
        return res.notFound();
      }
      return res.ok(); 
    });
  },
  removeProfile: function(req, res) {

    if (!req.param('id')) { 
      return res.badRequest('id is a required parameter.');
    }

    User.update({ 
      id: req.param('id')
    }, {
      deleted: true 
    }, function(err, removedUser) {

      if (err) return res.negotiate(err); 
      if (removedUser.length === 0) {
        return res.notFound();
      }

      req.session.userId = null;

      return res.ok(); 
    });
  },
  restoreProfile: function(req, res) {

    User.findOne({ 
      email: req.param('email')
    }, function foundUser(err, user) {
      if (err) return res.negotiate(err); 
      if (!user) return res.notFound();

      Passwords.checkPassword({ 
        passwordAttempt: req.param('password'),
        encryptedPassword: user.encryptedPassword
      }).exec({

        error: function(err) { 
          return res.negotiate(err);
        },

        incorrect: function() { 
          return res.notFound();
        },

        success: function() {

          User.update({
            id: user.id
          }, {
            deleted: false
          }).exec(function(err, updatedUser) {

            req.session.userId = user.id;

            return res.json(updatedUser);
          });
        }
      });
    });
  },

  restoreGravatarURL: function(req, res) {

    try {

      var restoredGravatarURL = gravatarURL = Gravatar.getImageUrl({
        emailAddress: req.param('email')
      }).execSync();

      return res.json(restoredGravatarURL);

    } catch (err) {
      return res.serverError(err);
    }
  },

  updateProfile: function(req, res) {

    User.update({
      id: req.param('id')
    }, {
      gravatarURL: req.param('gravatarURL') 
    }, function(err, updatedUser) {

      if (err) return res.negotiate(err); 

      return res.json(updatedUser); 

    });
  },

  changePassword: function(req, res) {

    if (_.isUndefined(req.param('password'))) { 
      return res.badRequest('A password is required!');
    }

    if (req.param('password').length < 6) { 
      return res.badRequest('Password must be at least 6 characters!');
    }

    Passwords.encryptPassword({ 
      password: req.param('password'),
    }).exec({
      error: function(err) {
        return res.serverError(err); 
      },
      success: function(result) {

        User.update({ 
          id: req.param('id')
        }, {
          encryptedPassword: result
        }).exec(function(err, updatedUser) {
          if (err) {
            return res.negotiate(err);
          }
          return res.json(updatedUser); 
        });
      }
    });
  },

  adminUsers: function(req, res) {

    User.find().exec(function(err, users){    

      if (err) return res.negotiate(err);   

      return res.json(users);     

    });
  },

  updateAdmin: function(req, res) {

    User.update(req.param('id'), {    
      admin: req.param('admin')   
    }).exec(function(err, update){

     if (err) return res.negotiate(err);  

      return res.ok();       
    });
  },

  updateBanned: function(req, res) {
    User.update(req.param('id'), {
      banned: req.param('banned')
    }).exec(function(err, update){
     if (err) return res.negotiate(err);
      return res.ok();
    });
  },

  updateDeleted: function(req, res) {
    User.update(req.param('id'), {
      deleted: req.param('deleted')
    }).exec(function(err, update){
     if (err) return res.negotiate(err);
      return res.ok();
    });
  }
};

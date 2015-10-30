/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var find = function (req, res) {
  UserService.find(function (err, users) {
    if (err) res.json(err, 500);
    else if (users) {
      res.json(users);
    } else {
      res.json({
        message: 'Users not found'
      }, 404);
    }
  });
};

/*
 * Not used
 */
var findOne = function (req, res) {
  UserService.findOne(req.param('id'), function (err, user) {
    if (err) res.json(err, 500);
    else if (user) {
      res.json(user);
    } else {
      res.json({
        message: 'User not found'
      }, 404);
    }
  });
};

/*
 * Not used
 */
var findOneEmail = function (req, res) {
  UserService.findOneEmail(req.param('email'), function (err, user) {
    if (err) res.json(err, 500);
    else if (user) {
      res.json(user);
    } else {
      res.json({
        message: 'User not found'
      }, 404);
    }
  });
};

var create = function (req, res) {
  UserService.create(req.body, function (err, user) {
    if (err) res.json(err, 500);
    else if (user) {
      res.json(user);
    } else {
      res.json({
        message: 'User not create'
      }, 404);
    }
  });
};

var update = function (req, res) {
  UserService.update(req.param('id'), req.body, function (err, user) {
    if (err) res.json(err, 500);
    else if (user) {
      res.json(user);
    } else {
      res.json({
        message: 'User not update'
      }, 404);
    }
  });
};

module.exports = {
  /* Methodes */
  find: find,
  create: create,
  update: update,
};

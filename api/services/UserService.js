/**
 * UserService.js
 */

var find = function (callback) {
  sails.log.debug('******************* User.find()');
  User.find().exec(function (err, users) {
    callback(err, users);
  });
};

var findOne = function (id, callback) {
  sails.log.debug('******************* User.findOne(' + id + ')');
  var query = {
    bool: {
      must: [{
        term: {
          'user.id': id
        }
      }]
    }
  };

  User.findOne(query).exec(function (err, user) {
    callback(err, user);
  });
};

/*
 * Not used
 */
var findOneEmail = function (email, callback) {
  sails.log.debug('******************* User.findOneEmail(' + email + ')');
  var query = {
    bool: {
      must: [{
        term: {
          'user.email': email
        }
      }]
    }
  };

  User.findOne(query).exec(function (err, user) {
    callback(err, user);
  });
};

var create = function (body, callback) {
  sails.log.debug('******************* User.create()');

  User.create(body).exec(function (err, user) {
    callback(err, user);
  });
};

var update = function (id, body, callback) {
  sails.log.debug('******************* User.update(' + id + ')');
  var query = {
    bool: {
      must: [{
        term: {
          'user.id': id
        }
      }]
    }
  };

  User.update(query, body).exec(function (err, user) {
    callback(err, user);
  });
};

var excludeUsersOfArray = function (array, users) {
  for (var i = 0; i < users.length; i++) {
    for (var j = 0; j < array.length; j++) {
      if (users[i].email === array[j].email) {
        array.splice(j, 1);
      }
    }
  }
};

module.exports = {
  find: find,
  findOne: findOne,
  create: create,
  update: update,
  excludeUsersOfArray: excludeUsersOfArray
};

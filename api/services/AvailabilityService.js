/**
 * AvailabilityService.js
 */

var find = function (callback) {
  sails.log.debug('******************* Availability.find()');

  var availabilities = [];
  User.find().exec(function (err, users) {
    users.forEach(function (user) {
      user.availabilities.forEach(function (availability) {
        availability.user = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        };
        availabilities.push(availability);
      });
    });
    callback(err, availabilities);
  });
};

var findUserId = function (userId, callback) {
  sails.log.debug('******************* Availability.findUserId(' + userId + ')');
  var query = {
    bool: {
      must: [{
        term: {
          'user.id': userId
        }
      }]
    }
  };

  User.find().where(query).limit(1).exec(function (err, users) {
    callback(err, users[0].availabilities);
  });
};

var create = function (body, callback) {
  sails.log.debug('******************* Availability.create()');

  var query = {
    bool: {
      must: [{
        term: {
          'user.id': body.userId
        }
      }]
    }
  };

  User.findOne(query).exec(function (err, user) {
    user.availabilities = user.availabilities.concat(body.availabilities);
    User.update(query, {
      availabilities: user.availabilities
    }).exec(function (err, res) {
      callback(err, user);
    });
  });
};

var update = function (body, callback) {
  sails.log.debug('******************* Availability.update()');

  var query = {
    bool: {
      must: [{
        term: {
          'user.id': body.userId,
        }
      }]
    }
  };

  User.findOne(query).exec(function (err, user) {
    body.availabilities.forEach(function (bodyAvailability) {
      user.availabilities.every(function (userAvailability) {
        if (bodyAvailability.date === userAvailability.date &&
          bodyAvailability.hours === userAvailability.hours) {
            userAvailability.mode = bodyAvailability.mode;
            return false;
        }
        return true;
      });
    });
    User.update(query, {
      availabilities: user.availabilities
    }).exec(function (err, res) {
      callback(err, user);
    });
  });
};

module.exports = {
  /* Methodes */
  find: find,
  findUserId: findUserId,
  create: create,
  update: update,
};

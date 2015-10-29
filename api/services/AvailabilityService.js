/**
 * AvailabilityService.js
 */

var find = function (callback) {
  sails.log.debug('******************* Availability.find()');
  Availability.find().exec(function (err, availabilities) {
    callback(err, availabilities);
  });
};

var findUserId = function (user_id, callback) {
  sails.log.debug('******************* Availability.findUserId(' + user_id + ')');
  var query = {
    bool: {
      must: [{
        term: {
          'availability.user': user_id
        }
      }]
    }
  };

  Availability.find()
    .where(query)
    .limit(100000)
    .exec(function (err, availabilities) {
      callback(err, availabilities);
    });
};

var findOne = function (id, callback) {
  sails.log.debug('******************* Availability.findOne(' + id + ')');
  var query = {
    bool: {
      must: [{
        term: {
          'availability.id': id
        }
      }]
    }
  };

  Availability.findOne(query).exec(function (err, availability) {
    callback(err, availability);
  });
};

var createOne = function (body, callback) {
  sails.log.debug('******************* Availability.createOne()');

  UserService.findOne(body.user, function (err, user) {

    body.user = user;

    Availability.create(body).exec(function (err, availability) {
      callback(err, availability);
    });
  });
};

var create = function (body, callback) {
  sails.log.debug('******************* Availability.create()');

  var availabilities = body.availabilities;
  Availability.createEach(availabilities).exec(function (err, availabilities) {
    callback(err, availabilities);
  });
};

var update = function (body, callback) {
  sails.log.debug('******************* Availability.update()');

  ids = [];
  for (var i = 0; i < body.availabilities.length; i++) {
    ids.push(body.availabilities[i].id);
  }

  var query = {
    bool: {
      should: [{
        terms: {
          'availability.id': ids
        }
      }]
    }
  };

  Availability.update(query, {
    mode: body.mode
  }).exec(function (err, availabilities) {
    callback(err, availabilities);
  });
};

var updateOne = function (availability, res, err) {
  sails.log.debug('******************* Availability.updateOne(' + availability.id + ')');

  var query = {
    bool: {
      must: [{
        term: {
          'availability.id': availability.id
        }
      }]
    }
  };

  Availability.update(query, {
    mode: availability.mode
  }).exec(function (err, res) {
    if (err) {
      err = err;
    } else if (availability) {
      res = availability;
    }
  });
};

module.exports = {
  find: find,
  findUserId: findUserId,
  findOne: findOne,
  create: create,
  update: update,
};

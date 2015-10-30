/**
 * AvailabilityController
 *
 * @description :: Server-side logic for managing Availabilities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var find = function (req, res) {
  if (req.param('userId')) {
    return findUserId(req, res);
  }

  AvailabilityService.find(function (err, availabilities) {
    if (err) res.json(err, 500);
    else if (availabilities) {
      res.json(availabilities);
    } else {
      res.json({
        message: 'Availabilities not found'
      }, 404);
    }
  });
};

var findUserId = function (req, res) {
  AvailabilityService.findUserId(req.param('userId'), function (err, availabilities) {
    if (err) res.json(err, 500);
    else if (availabilities) {
      res.json(availabilities);
    } else {
      res.json({
        message: 'Availabilities not found'
      }, 404);
    }
  });
};

var create = function (req, res) {
  AvailabilityService.create(req.body, function (err, availabilities) {
    if (err) res.json(err, 500);
    else if (availabilities) {
      res.json(availabilities);
    } else {
      res.json({
        message: 'Availability not create'
      }, 404);
    }
  });
};

var update = function (req, res) {
  AvailabilityService.update(req.body, function (err, availabilities) {
    if (err) res.json(err, 500);
    else if (availabilities) {
      res.json(availabilities);
    } else {
      res.json({
        message: 'availabilities not update'
      }, 404);
    }
  });
};

module.exports = {
  /* Methodes */
  find: find,
  create: create,
  update: update

};

/**
 * EventController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var find = function (req, res) {
	if (req.param('user_id')) { return findUserId(req, res); }  
	
	EventService.find(function (err, events) {
		if (err) res.json(err, 500);
		else if (events) {
			res.json(events);
		} else {
			res.json({ message: 'Events not found' }, 404);
		}
	});
};

var findOne = function (req, res) {
	EventService.findOne(req.param('id'), function (err, event) {
		if (err) res.json(err, 500);
		else if (event) {
			res.json(event)
		} else {
			res.json({ message: 'Event not found' }, 404);
		}
	});
};

var findUserId = function (req, res) {	
	EventService.findUserId(req.param('user_id'), function(err, events) {
		if (err) res.json(err, 500);
		else if (events) {
			res.json(events)
		} else {
			res.json({ message: 'Events not found' }, 404);
		}
	});
};

var createOne = function (req, res) {
	EventService.createOne(req.body, function (err, event) {
		if (err) res.json(err, 500);
		else if (event) {
			res.json(event)
		} else {
			res.json({ message: 'Event not create' }, 404);
		}
	});
};

var updateOne = function (req, res) {
	EventService.update(req.body, function (err, event) {
		if (err) res.json(err, 500);
		else if (event) {
			res.json(event)
		} else {
			res.json({ message: 'Event not update' }, 404);
		}
	});
};

module.exports = {
		
	/* Methodes */
	find: find,
	findUserId: findUserId,
	findOne: findOne,
	createOne: createOne,
	updateOne: updateOne
	
};


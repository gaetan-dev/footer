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
			must: [
				{
					term: {
						'availability.user.id': user_id
					}
				}
			]
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
			must: [
				{
					term: {
						'availability.id': id
					}
				}
			]
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
	if (availabilities.length > 0) {
		UserService.findOne(availabilities[0].user, function (err, user) {
			
			// Add the current user
			for (var i = 0; i < availabilities.length; i++) {
				availabilities[i].user = user;
			}			
			
			Availability.create(availabilities).exec(function (err, availability) {
				callback(err, availability);
			});
		});
	}
};

var update = function (body, callback) {
	sails.log.debug('******************* Availability.update()');
	
	updateLoop(body.availabilities, callback);
};

var updateOne = function (availability, loop, callback) {
	sails.log.debug('******************* Availability.updateOne(' + availability.id + ')');
	var query = {
		bool: {
			must: [
				{
					term: {
						'availability.id': availability.id
					}
				}
			]
		}
	};

	Availability.update(query, {mode: availability.mode}).exec(function (err, availability) {
		if (err) { callback(err, availability); }
		else if (availability) { 
			loop();
		}	
	});
};

var updateLoop = function (availabilities, callback) {
	if (availabilities.length > 0) {
		var availability = availabilities.splice(0, 1)[0];
		
		var loop = function () {
			updateLoop(availabilities, callback);
		};
		
		updateOne(availability, loop, callback);	
	}
};

module.exports = {
	find: find,
	findUserId: findUserId,
	findOne: findOne,
	create: create,
	update: update,
}
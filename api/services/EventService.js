/**
* EventService.js
*/

var find = function (callback) {
	sails.log.debug('******************* Event.find()');
	Event.find().exec(function (err, events) {
		callback(err, events);
	});
};

var findUserId = function (user_id, callback) {
	sails.log.debug('******************* Event.findUserId(' + user_id + ')');
	var query = {
		bool: {
			must: [
				{
					term: {
						'event.users.id': user_id
					}
				}
			]
		}
	};

	Event.find()
		.where(query)
		.limit(100000)
		.exec(function (err, events) {
			callback(err, events);
		});
};
	
var findOne = function (id, callback) {
	sails.log.debug('******************* Event.findOne(' + id + ')');
	var query = {
		bool: {
			must: [
				{
					term: {
						'event.id': id
					}
				}
			]
		}
	};

	Event.findOne(query).exec(function (err, event) {
		callback(err, event);
	});
};

var createOne = function (body, callback) {
	sails.log.debug('******************* Event.createOne()');

	UserService.findOne(body.master, function (err, user) {
		
		body.master = user;
		
		Event.create(body).exec(function (err, event) {
			callback(err, event);
		});
	});
};

var updateOne = function (body, callback) {
	sails.log.debug('******************* Event.updateOne(' + body.event.id + ')');
	var query = {
		bool: {
			must: [
				{
					term: {
						'event.id': body.event.id
					}
				}
			]
		}
	};

	Event.update(query, body).exec(function (err, event) {
		callback(err, event);	
	});
};

module.exports = {
	find: find,
	findUserId: findUserId,
	findOne: findOne,
	createOne: createOne,
	update: updateOne,
}
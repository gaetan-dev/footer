module.exports = {
	
	find: function (callback) {
		sails.log.debug('******************* User.find()');
		User.find().exec(function (err, users) {
			callback(err, users);
		});
	},
	
	findOne: function (id, callback) {
		sails.log.debug('******************* User.findOne(' + id + ')');
		var query = {
			bool: {
				must: [
					{
						term: {
							'user.id': id
						}
					}
				]
			}
		};

		User.findOne(query).exec(function (err, user) {
			callback(err, user);
		});
	},
	
	findOneEmail: function (email, callback) {
		sails.log.debug('******************* User.findOneEmail(' + email + ')');
		var query = {
			bool: {
				must: [
					{
						term: {
							'user.email': email
						}
					}
				]
			}
		};

		User.findOne(query).exec(function (err, user) {
			callback(err, user);
		});
	},
	
	create: function (body, callback) {
		sails.log.debug('******************* User.create()');

		User.create(body).exec(function (err, user) {
			callback(err, user);
		});
	},
	
	update: function (id, body, res) {
		sails.log.debug('******************* User.update(' + id + ')');
		var query = {
			bool: {
				must: [
					{
						term: {
							'user.id': id
						}
					}
				]
			}
		};

		User.update(query, body).exec(function (err, user) {
			callback(err, user);
		});
	}
}
/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var findOneEmail = function (req, res) {
	sails.log.debug("*******************findOneEmail(" + req.param('email') + ")");
	var query = {
		bool: {
			must: [
				{
					term: {
						"user.email": req.param('email')
					}
				}
			]
		}
	};

	User.findOne(query).exec(function (err, user) {
		if (err) res.json({ error: 'oups error' }, 500);
		if (user) {
			res.json(user)
		} else {
			res.json({ message: 'User not found' }, 404);
		}
	});
};

module.exports = {
	findOneEmail: findOneEmail,

	find: function (req, res) {
		sails.log.debug("*******************find()");
		User.find().exec(function (err, users) {
			if (err) res.json({ error: 'oups error' }, 500);
			if (users) {
				res.json(users);
			} else {
				res.json({ message: 'User not found' }, 404);
			}
		});
	},

	findOne: function (req, res) {
		sails.log.debug("*******************findOne(" + req.param('id') + ")");
		var query = {
			bool: {
				must: [
					{
						term: {
							id: req.param('id')
						}
					}
				]
			}
		};

		User.findOne(query).exec(function (err, user) {
			if (err) res.json({ error: 'oups error' }, 500);
			if (user) {
				res.json(user)
			} else {
				res.json({ message: 'User not found' }, 404);
			}
		});
	},

	connect: function (req, res) {
		sails.log.debug("*******************connect(" + req.param('id') + ", " + req.param('password') + ")");
		var query = {
			bool: {
				must: [
					{
						term: {
							email: req.param('email')
						}
					},
					{
						term: {
							password: req.param('password')
						}
					}
				]
			}
		};

		User.findOne(query).exec(function (err, user) {
			if (err) res.json({ error: 'oups error' }, 500);
			if (user) {
				res.json(user)
			} else {
				res.json({ message: 'User not found' }, 404);
			}
		});
	},

	create: function (req, res) {
		sails.log.debug("*******************create()");

		User.create(req.body).exec(function (err, users) {
			if (err) res.json({ error: 'oups error' }, 500);
			if (users) {
				res.json(users)
			} else {
				res.json({ message: 'User not create' }, 404);
			}
		});
	},

	update: function (req, res) {
		sails.log.debug("*******************update(" + req.param('id') + ")");
		var query = {
			bool: {
				must: [
					{
						term: {
							id: req.param('id')
						}
					}
				]
			}
		};

		User.update(query, req.body).exec(function (err, user) {
			if (err) res.json({ error: 'oups error' }, 500);
			if (user) {
				res.json(user)
			} else {
				res.json({ message: 'User not update' }, 404);
			}
		});
	}
};


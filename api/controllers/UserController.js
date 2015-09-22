/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	find: function (req, res) {
		UserService.find(function (err, users) {
			if (err) res.json({ error: 'oups error' }, 500);
			if (users) {
				res.json(users);
			} else {
				res.json({ message: 'User not found' }, 404);
			}
		});
	},

	findOne: function (req, res) {
		UserService.findOne(req.param('id'), function (err, user) {
			if (err) res.json({ error: 'oups error' }, 500);
			if (user) {
				res.json(user)
			} else {
				res.json({ message: 'User not found' }, 404);
			}
		});
	},
	
	findOneEmail: function (req, res) {	
		UserService.findOneEmail(req.param('email'), function(err, user) {
			if (err) res.json({ error: 'oups error' }, 500);
			if (user) {
				res.json(user)
			} else {
				res.json({ message: 'User not found' }, 404);
			}
		});
	},

	create: function (req, res) {
		UserService.create(req.body, function (err, user) {
			if (err) res.json({ error: 'oups error' }, 500);
			if (user) {
				res.json(user)
			} else {
				res.json({ message: 'User not create' }, 404);
			}
		});
	},

	update: function (req, res) {
		UserService.update(req.param('id'), req.body, function (err, user) {
			if (err) res.json({ error: 'oups error' }, 500);
			if (user) {
				res.json(user)
			} else {
				res.json({ message: 'User not update' }, 404);
			}
		});
	}
};


/**
 * AvailabilityController
 *
 * @description :: Server-side logic for managing Availabilities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
		sails.log.debug("*******************create()");
		
		UserService.findOneEmail(req, res, function (user) {
			
			if (typeof req.body.user === 'undefined') {
				req.body.user = user;
			}
			
			Availability.create(req.body).exec(function (err, availability) {
				if (err) res.json({ error: 'oups error' }, 500);
				if (availability) {
					res.json(availability)
				} else {
					res.json({ message: 'User not create' }, 404);
				}
			});
		});
	},
};


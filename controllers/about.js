var Person = require('../models/person');

module.exports = function(req, res, next) {
	Person.findOne({ }, function(err, user) {
		if (err) throw err;
		console.log('read about page successifully!');
		res.end();
	});
};

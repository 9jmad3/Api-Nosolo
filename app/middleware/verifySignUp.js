const db = require('../config/db.config.js');
const config = require('../config/config.js');
const ROLEs = config.ROLEs;
const User = db.user;
const Role = db.role;

checkDuplicate = (req, res, next) => {

	// -> Check Username is already in use
	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(user => {
		if (user) {
			res.status(400).send("Error, ese usuario está en uso!");
			return;
		}

		// -> Check Email is already in use
		User.findOne({
			where: {
				email: req.body.email
			}
		}).then(user => {
			if (user) {
				res.status(400).send("Error, email en uso");
				return;
			}
		});

		next();
	});
}

const signUpVerify = {};
signUpVerify.checkDuplicate = checkDuplicate;


module.exports = signUpVerify;






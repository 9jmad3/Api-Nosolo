const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');



/**
 * CREATE NEW USER
 * @param {*} req 
 * @param {*} res 
 */
exports.newUser = (req, res) => {
	// Save User to Database
	console.log(req.body);

	User.create({
		email: req.body.email,
		username: req.body.username,
		rolId: 2,
		password: bcrypt.hashSync(req.body.password, 8),
	}).then(() => {
		res.json({ok: true})
		console.log(req.body);
	}).catch(err => {
		console.log(err);
		if(Array.isArray(err.errors)){
			if ('path' in err.errors[0]) {
				if (err.errors[0].path == 'email') {
					err.errors = 'Error en el email, no es valido'
				}
				res.status(500).send(err);
				return;
			}
		}else{
			if ('original' in err) {
				if (err.original.constraint == 'users_username_key') {
					err.errors = 'Error en el usuario, ya existe'
				}
			}
			if ('original' in err) {
				if (err.original.constraint == 'users_email_key') {
					err.errors = 'Error en el email, ya existe'
				}
			}
		}
		res.status(500).send(err);
	})
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getUsersById = (req, res) => {
	let listUserId = req.body;

	User.findAll({
		where: {
			id: listUserId
		}
	}).then(user => {
		res.status(200).json({
			"description": "Lista de asistentes",
			"users": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "No puedes acceder a la lista de usuarios",
			"error": err
		});
	})
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.signin = (req, res) => {
	console.log("Sign-In");

	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send('Usuario no encontrado.');
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send("Contraseña invalida!");
		}

		if (user.enabled === false) {
			return res.status(401).send("El usuario está deshabilitado!");
		}

		// var token = jwt.sign({ id: user.id }, config.secret, {
		// 	expiresIn: 21600 // expires in 6 hours
		// });

		var token = jwt.sign({ user: user }, config.secret, {
			expiresIn: 21600 // expires in 6 hours
		});

		res.status(200).send({ auth: true, accessToken: token, user: { id: user.id, name: user.name, email: user.email, username: user.username } });

	}).catch(err => {
		res.status(500).send('Errorr -> ' + err);
	});
}



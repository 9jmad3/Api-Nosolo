const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;
const Vehicle = db.vehicle;
const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');



/**
 * CREATE NEW USER
 * @param {*} req 
 * @param {*} res 
 */
exports.newUser = (req, res) => {
	// Save User to Database
	console.log("Processing func -> newUser");

	User.create({
		email: req.body.email,
		username: req.body.username,
		rol_id: 2,
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


exports.getUsersById = (req, res) => {
	
	let listUserId = req.body;

	console.log(listUserId);

	User.findAll({
		where: {
			id: listUserId
		},
		include: {
			model: Vehicle,
			where: vehicleId = req.body.vehicleId
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
 * Método de inicio de sesión, busca y comprueba que el usuario exista y la contraseña sea correcta.
 * Si el inicio de sesión es correcto, crea un token y devuelve el mismo junto con el id del usuario, 
 * el token, el nombre, el mail y el nombre de usuario.
 * En caso de no poder iniciar sesión, devuelve un mensaje de error y no crea el token
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

		// res.status(200).send({ auth: true, accessToken: token });

	}).catch(err => {
		res.status(500).send('Errorr -> ' + err);
	});
}


/**
 * 
 * Método que lista todos los usuarios, junto con su respectivo rol, stock, ordenes y albaranes
 * que tenga.
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.listUser = (req, res) => {
	User.findAll({
		attributes: ['id', 'name', 'surname', 'username', 'enabled', 'email', 'generic_one', 'generic_two', 'createdAt', 'updatedAt'],
		include: [{
			model: Role,
		},
		{
			model: Stock
		},
		{
			model: DelNot,
			as: 'userDel'
		},
		{
			model: Job,
			as: 'userWorker'
		}]

	}).then(user => {
		res.status(200).json({
			"description": "Lista de usuarios",
			"user": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "No puedes acceder a la lista de usuarios",
			"error": err
		});
	})
}



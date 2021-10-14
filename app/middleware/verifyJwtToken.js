const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const db = require('../config/db.config.js');
const Role = db.role;
const User = db.user;


/**
 * Verify access token
 */
verifyToken = (req, res, next) => {
	let token = req.headers['accesstoken'];
	if (!token) {
		return res.status(403).send({
			auth: false, message: 'No token provided.'
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(500).send({
				auth: false,
				message: 'Fail to Authentication. Error -> ' + err
			});
		}
		req.user = decoded.user;
		next();
	});
}

/**
 *Verify role admin
 */
isAdmin = (req, res, next) => {
	let token = req.headers['accesstoken'];

	if (!token) {
		return res.status(403).send({
			auth: false, message: 'No token provided.'
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(500).send({
				auth: false,
				message: 'Fail to Authentication. Error -> ' + err
			});
		}

		Role.findByPk(decoded.user.rol_id,{
			raw: true,
			nest: true,
			plain: true
		})
			.then(role => {
				if (role.name === "ADMINISTRADOR") {

					next();
					return;
				}
				res.status(403).send("Rol de administrador requerido!");
				return;
			})
	})
}

/**
 * Comprueba que el rol del user del token que se le pasa sea tecnico
 */
isTec = (req, res, next) => {
	let token = req.headers['accesstoken'];

	if (!token) {
		return res.status(403).send({
			auth: false, message: 'No token provided.'
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(500).send({
				auth: false,
				message: 'Fail to Authentication. Error -> ' + err
			});
		}

		Role.findByPk(decoded.user.rol_id,{
			raw: true,
			nest: true,
			plain: true
		})
			.then(role => {

				if (role.name === "TECNICO") {

					next();
					return;
				}
				res.status(403).send("Rol de tecnico requerido!");
				return;
			})
	})
}


/**
 * Comprueba que el rol del user del token que se le pasa sea gestor
 */
isGestor = (req, res, next) => {
	let token = req.headers['accesstoken'];

	if (!token) {
		return res.status(403).send({
			auth: false, message: 'No token provided.'
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(500).send({
				auth: false,
				message: 'Fail to Authentication. Error -> ' + err
			});
		}

		Role.findByPk(decoded.user.rol_id,{
			raw: true,
			nest: true,
			plain: true
		})
			.then(role => {

				if (role.name === "GESTOR") {

					next();
					return;
				}
				res.status(403).send("Rol de gestor requerido!");
				return;
			})
	})
}


/**
 * Comprueba que el rol del user del token que se le pasa sea admin o gestor
 */
isAdminOrGest = (req, res, next) => {
	let token = req.headers['accesstoken'];

	if (!token) {
		return res.status(403).send({
			auth: false, message: 'No token provided.'
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(500).send({
				auth: false,
				message: 'Fail to Authentication. Error -> ' + err
			});
		}

		Role.findByPk(decoded.user.rol_id,{
			raw: true,
			nest: true,
			plain: true
		})
			.then(role => {

				if (role.name === "ADMINISTRADOR") {

					next();
					return;
				}
				if (role.name === "GESTOR") {

					next();
					return;
				}
				res.status(403).send("Rol de administrador o gestor requerido!");
				return;
			})
	})
}




const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;
authJwt.isGestor = isGestor;
authJwt.isTec = isTec;


authJwt.isAdminOrGest = isAdminOrGest;

module.exports = authJwt;
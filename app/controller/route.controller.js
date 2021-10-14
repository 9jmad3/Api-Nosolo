const { Sequelize } = require('../config/db.config.js');
const db = require('../config/db.config.js');
const Op = Sequelize.Op;
const operatorsAliases = { $eq: Op.eq }
const userModel = require('../model/user.model.js');
const User = db.user;
const Route = db.route;
const Assistant = db.assistant;

/**
 * 
 * LIST ALL ROUTES
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.listRoutes = (req, res) => {
	Route.findAll({})
    .then(routes => {
		res.status(200).json({
			"routes": routes
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access this page",
			"error": err
		});
	})
}

/**
 * 
 * LIST ROUTE BY ID
 * 
 * @param {*} req 
 * @param {*} res 
 */
 exports.routeById = (req, res) => {
	Route.findOne({
		where: {
			id: req.params.id
		},
		include: [
		{
			model: User, 
			as: 'user',
			attributes: ['id', 'username']
		},
	]
	}).then(route => {
		res.status(200).json({
			"route": route
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access this page",
			"error": err
		});
	})
}

/**
 * FOR CREATE A NEW ROUTE
 * @param {*} req 
 * @param {*} res 
 */
exports.newRoute = (req, res) => {
	console.log("Processing func -> New Route");

    Route.create({
        title: req.body.title,
        type: req.body.type,
        status: req.body.status,
        cc: req.body.cc,
        km: req.body.km,
        province: req.body.province,
        userId: req.body.userId,
		date: req.body.date,
		hour: req.body.hour,
        description: req.body.description
    }).then(() => {
        res.json({ok: true})
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.cancelledRoute = (req, res) => {

	console.log("Processing func -> cancelledRoute");

	Route.findOne({
		where: {
			id: req.params.id
		},
		raw: true,
		nest: true,
		plain: true
	}).then(route => {
		//si esta activado lo desactiva y viceversa
		Route.update({
			status: "cancelled",
		},
			{
				where: { id: req.params.id }
			}).then(() => {
				res.json({ok: true})

			}).catch(err => {
				res.status(500).send("Fail! Error -> " + err);
			})
	})
}


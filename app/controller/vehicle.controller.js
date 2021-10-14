const db = require('../config/db.config.js');
const userModel = require('../model/user.model.js');
const User = db.user;
const Vehicle = db.vehicle;

/**
 * 
 * LIST VEHICLE BY USER ID
 * 
 * @param {*} req 
 * @param {*} res 
 */
 exports.vehicleByUserId = (req, res) => {
	Vehicle.findAll({
		where: {
			userId: req.params.id
		}
	}).then(vehicles => {
		res.status(200).json({
			"vehicles": vehicles
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
exports.newVehicle = (req, res) => {
	console.log("Processing func -> New Vehicle");

    Vehicle.create({
        title: req.body.title,
        userId: req.body.userId,
    }).then(() => {
        res.json({ok: true})
    }).catch(err => {
        res.status(500).send(err);
    })
}

/**
 * 
 * Funcion que borra la familia que se le pasa como parámetro, el id
 * 
 * @param {*} req 
 * @param {*} res 
 */
 exports.deleteById = (req, res) => {
	console.log("Delete by id");

	Vehicle.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => {
		res.json({ok: true})
	}).catch(err => {
		res.status(500).send(err);
	});;
}
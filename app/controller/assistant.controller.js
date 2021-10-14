const { assistant, vehicle } = require('../config/db.config.js');
const db = require('../config/db.config.js');
const Assistant = db.assistant;
const Vehicle = db.vehicle;
const User = db.user;

/**
 * 
 * LIST ASSISTANTS BY ROUTE ID
 * 
 * @param {*} req 
 * @param {*} res 
 */
 exports.assistantByUserId = (req, res) => {
	console.log(req.params.id);
	Assistant.findAll({
		where: {
			routeId: req.params.id
		},
	}).then(assitant => {
		res.status(200).json({
			"assistant": assitant
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
exports.newAssistant = (req, res) => {
	console.log("Processing func -> New Assistant");

    Assistant.create({
        userId: req.body.userId,
        routeId: req.body.routeId
    }).then(() => {
        res.json({ok: true})
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.cancelAssistant = (req, res) => {
	console.log("Processing func -> Cancel Assistant");

    Assistant.destroy({
        where: {
			userId: req.body.userId,
        	routeId: req.body.routeId
		}
    }).then(() => {
        res.json({ok: true})
    }).catch(err => {
        res.status(500).send(err);
    })
}



// exports.cancelledRoute = (req, res) => {

// 	console.log("Processing func -> cancelledRoute");

// 	Route.findOne({
// 		where: {
// 			id: req.params.id
// 		},
// 		raw: true,
// 		nest: true,
// 		plain: true
// 	}).then(route => {
// 		//si esta activado lo desactiva y viceversa
// 		Route.update({
// 			status: "cancelled",
// 		},
// 			{
// 				where: { id: req.params.id }
// 			}).then(() => {
// 				res.json({ok: true})

// 			}).catch(err => {
// 				res.status(500).send("Fail! Error -> " + err);
// 			})
// 	})
// }

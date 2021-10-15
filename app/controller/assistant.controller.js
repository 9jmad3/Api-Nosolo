const db = require('../config/db.config.js');
const Assistant = db.assistant;

/**
 * 
 * LIST ASSISTANTS BY ROUTE ID
 * 
 * @param {*} req 
 * @param {*} res 
 */
 exports.assistantByUserId = (req, res) => {

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

    Assistant.create({
        userId: req.body.userId,
        routeId: req.body.routeId
    }).then(() => {
        res.json({ok: true})
    }).catch(err => {
        res.status(500).send(err);
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.cancelAssistant = (req, res) => {

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

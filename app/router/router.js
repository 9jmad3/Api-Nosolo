const verifySignUp = require('../middleware/verifySignUp');
const authJwt = require('../middleware/verifyJwtToken');

module.exports = function(app) {
    const controller = require('../controller/controller.js');
	const routerController = require('../controller/route.controller.js')
	const assistantController = require('../controller/assistant.controller.js')
	// const vehicleController = require('../controller/vehicle.controller.js')
	

	//SIGNIN
	app.post('/api/auth/signin', controller.signin);

	//LISTS
	app.get('/api/listRoutes', authJwt.verifyToken, routerController.listRoutes); //

	//SEARCH BY ID
	app.get('/api/listRoutes/:id', authJwt.verifyToken, routerController.routeById);
	app.get('/api/listAssistantByRouteId/:id', authJwt.verifyToken, assistantController.assistantByUserId);
	app.post('/api/listInfoAssistant', authJwt.verifyToken, controller.getUsersById);
	// app.get('/api/listVehiclesByUserId/:id', vehicleController.vehicleByUserId);

	//DELETES
	// app.delete('/api/deleteVehicle/:id', vehicleController.deleteById);
	app.post('/api/cancelAssistant', authJwt.verifyToken, assistantController.cancelAssistant);

	//CREATES	
	app.post('/api/newUser', [verifySignUp.checkDuplicate], controller.newUser);
	app.post('/api/newRoute', authJwt.verifyToken, routerController.newRoute);
	app.post('/api/newAssistant', authJwt.verifyToken, assistantController.newAssistant);
	// app.post('/api/newVehicle', vehicleController.newVehicle);
	
	//UPDATES
	app.put('/api/cancelledRoute/:id', routerController.cancelledRoute);
}
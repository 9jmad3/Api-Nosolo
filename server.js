var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');


app.use(bodyParser.json())
app.use(cors())

// password encrypt
var bcrypt = require('bcryptjs');

require('./app/router/router.js')(app);

const db = require('./app/config/db.config.js');
const Role = db.role;
const User = db.user;

// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
	console.log('Drop and Resync with { force: false }');
	initial();
});

// Create a Server
// var server = app.listen(3001, "127.0.0.1", function () {
// 	var host = server.address().address
// 	var port = server.address().port
// 	console.log("App listening at http://%s:%s", host, port)
// })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});


function initial() {
	Role.create({
		id: 1,
		name: "ADMINISTRADOR"
	});

	Role.create({
		id: 2,
		name: "STANDAR"
	});

	User.create({
		username: 'jaledom',
		email: 'jaledom@gmail.com',
		password: bcrypt.hashSync("1234", 8),
		enabled: true,
		rolId: 1
	});

	User.create({
		username: 'cridiazm',
		email: 'cridiaz@gmail.com',
		password: bcrypt.hashSync("1234", 8),
		enabled: true,
		rolId: 2
	});

	User.create({
		username: 'afn',
		email: 'juanfran@gmail.com',
		password: bcrypt.hashSync("1234", 8),
		enabled: true,
		rolId: 2
	});
}
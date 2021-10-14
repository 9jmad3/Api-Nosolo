module.exports = (sequelize, Sequelize) => {
	const Route = sequelize.define('routes', {
		title: {
			type: Sequelize.STRING,
			allowNull: false,	
		},
		type: {
			type: Sequelize.STRING
		},
		status: {
			type: Sequelize.STRING,
		},
		cc: {
			type: Sequelize.STRING,
		},
		km: {
			type: Sequelize.STRING,
		},
		province: {
			type: Sequelize.STRING,
			allowNull: false
		},
		userId: {
			type: Sequelize.INTEGER
		},
		hour: {
			type: Sequelize.STRING
		},
		date: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.TEXT
		}
	});	
	return Route;
}
module.exports = (sequelize, Sequelize) => {
	const Vehicle = sequelize.define('vehicles', {
		title: {
			type: Sequelize.STRING,
			allowNull: false,	
		},
		userId: {
			type: Sequelize.INTEGER
		}
	});	
	return Vehicle;
}
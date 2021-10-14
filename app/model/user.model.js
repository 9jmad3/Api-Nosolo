module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('users', {
		enabled: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: true
		},
		username: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
			validate:{
				isEmail: true
			}
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
		rolId: {
			type: Sequelize.INTEGER
		}
	});	
	return User;
}
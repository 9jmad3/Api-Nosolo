const env = require('./env.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Database tables
db.role = require('../model/role.model.js')(sequelize, Sequelize);
db.user = require('../model/user.model.js')(sequelize, Sequelize);
db.route = require('../model/route.model.js')(sequelize, Sequelize);
db.vehicle = require('../model/vehicle.model.js')(sequelize, Sequelize);
db.assistant = require('../model/assistant.model.js')(sequelize, Sequelize);

//Relations of tables
db.role.hasMany(db.user, {foreignKey: 'rolId'});
db.user.belongsTo(db.role, {foreignKey: 'rolId'});

db.user.hasMany(db.route, {foreignKey: 'userId'});
db.route.belongsTo(db.user, {foreignKey: 'userId'});

db.user.hasMany(db.vehicle, {foreignKey: 'userId'});
db.vehicle.belongsTo(db.user, {foreignKey: 'userId'});

db.route.belongsToMany(db.user, { through: 'assistants'});
db.user.belongsToMany(db.route, { through: 'assistants'});

//Create database
module.exports = db;
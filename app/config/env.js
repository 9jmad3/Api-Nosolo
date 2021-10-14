 const env = {
  database: 'd32sehtn5dqfnj', 
  username: 'cstwadbuqvguoi',
  password: 'ff70dccfc0b98c7c9fb410677176dde0866d520a442076ebd8c6c319a9e041e6',
  host: 'ec2-54-228-162-209.eu-west-1.compute.amazonaws.com',
  dialect: 'postgres',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};
module.exports = env;

//  const env = {
//   database: 'nosolo', 
//   username: 'postgres',
//   password: 'password',
//   host: 'localhost',
//   dialect: 'postgres',
//   pool: {
// 	  max: 5,
// 	  min: 0,
// 	  acquire: 30000,
// 	  idle: 10000
//   }
// };
// module.exports = env;

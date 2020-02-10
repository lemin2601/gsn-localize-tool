const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('gsn-localize', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  port:3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // logging: true
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;
(async ()=>{
  try{
    await sequelize.authenticate();
    console.log("connect success db");
  } catch(e){
    console.log("unable connect db",e);
  }
})();

module.exports = db
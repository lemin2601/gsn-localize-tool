const Sequelize = require('sequelize')
const db = require('../database/db.js')

const User = db.sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
);
(async () => {
  await User.sync({force:true}); 
  var user = await User.create({email:'a1bc@gmail.com'});
  user.save();
})();

module.exports = User

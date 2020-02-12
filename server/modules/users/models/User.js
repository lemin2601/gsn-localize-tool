const Sequelize = require('sequelize')
const db = require('./../../../database/db.js')
const bcrypt = require('bcrypt')

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
  await User.sync(/**{alter:true}*/);
  User.findOne({
    where: {
      user: 'admin'
    }
  }).then(admin => {
    if (admin) {
      console.log("admin exist!" + JSON.stringify(admin));
      bcrypt.hash("admin", 10, (err, hash) => {
        console.log("gen hash:" + hash);
        User.update({
          password: hash
        },{where:{
          user: 'admin' 
        }})
          .then(user => {
            console.log("updated!:" + JSON.stringify(user));
          })
          .catch(err => {
            console.log("updated! error:" + JSON.stringify(err))
          })
      })
    } else {
      bcrypt.hash("admin", 10, (err, hash) => {
        User.create({
          user: 'admin',
          email: 'lemin2601@gmail.com',
          password: hash,
          role: 'admin',
          created: new Date()
        })
          .then(user => {
            console.log("init admin success!");
          })
          .catch(err => {
            console.log("init admin failed")
          })
      })
    }
  }).catch(err => {

  })
})();

module.exports = User

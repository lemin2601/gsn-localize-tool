const express = require('express')
const admin = express.Router()
const cors = require('cors')

const users = require('../users/routes/Users')
admin.use(cors())

admin.use('/users',users);

module.exports = admin
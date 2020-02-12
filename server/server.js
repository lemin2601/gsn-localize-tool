var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 5000

process.env.SECRET_KEY = 'secret'

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

var Users = require('./modules/users/routes/Users')
var Admin = require('./modules/admin/routes/Admin')
app.use('/users', Users)
app.use('/admin', Admin)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})
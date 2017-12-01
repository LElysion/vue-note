
var app = require('express').Router()
// var userController = require('./controllers/users.js')
var vuexController = require('./controllers/vuexController')
/*
server端
*/
// http://localhost:8081/v1/vuex/addtext
app.post('/vuex/addtext', vuexController.addText)
app.post('/vuex/gettextlist', vuexController.getTextList)
app.post('/vuex/gettext', vuexController.getText)
app.post('/vuex/deltext', vuexController.delText)
module.exports = app

require('babel-register')
require('babel-polyfill')

/*获取需求模块*/
var express = require('express');
var app = express(); 
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var MongoClient = require('mongodb').MongoClient
var cookieParser = require('mongodb').ObjectID

global._ = require('lodash')

global.app = express()
console.log('connecting database...')


global.db = null
var dbn = 'note'

MongoClient.connect('mongodb://localhost:27017/'+dbn,function(err, instance){
	if(err!=null){
		return console.log('database error')
	}

	global.db = instance
	console.log('database connected: ', dbn)

	var bodyParser = require('body-parser')
	var jsonParser = bodyParser.json() /*解析json*/
	var app = express()
	app.use(bodyParser())
	app.use(bodyParser.urlencoded({extended: false}))
	
	//app.use(cookieParser())

	var MongoStore = require('connect-mongo')(session)

	//app.use(cookieParser()) /*????*/

	app.use(session({ //配置session
		secret: 'note',
		name: 'note',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({
			host: '127.0.0.1',
			port: '27017',
			db: 'sessions',
			url: 'mongodb://localhost:27017/note'
		})
	}))

	
	console.log('starting http...')
	var webapp = app.listen(8081, function(){
		var host = webapp.address().address
		var port = webapp.address().port
		// app.use(function(req, res, next) {
		// 	res.header("Access-Control-Allow-Origin", "*");
		// 	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
		// 	next();
		// });
		var docRoute = require('./server/routes.js')
		app.use('/v1/', docRoute)
		app.use(express.static('dist'))
		app.use('*', (req, res) =>{
			res.sendFile(__dirname + '/dist/index.html')
		})
	})
})


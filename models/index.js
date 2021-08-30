/**
 * DB Layer module.
 * Author: Babatope Olajide.
 * Version: 1.0.0
 * Release Date: 08-April-2020
 * Last Updated: 09-April-2020
 */

/**
 * Module dependencies.
 */

var fs = require('fs')
var path = require('path')
var Sequelize = require('sequelize')
var config = require('../config')
var db = {}

// var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db.sequelizeParams);
var sequelize = new Sequelize(
	config.DBNAME,
	config.DBUSERNAME,
	config.DBPASSWORD,
	{
		host: config.DBHOST,
		port: config.DBPORT,
		multipleStatements: true,
		dialect: config.DBDIALECT,
		logging: false,
		dialectOptions: {
			ssl: config.SSL,
		},
	},
)

const Op = Sequelize.Op
db.Op = Op
// load models

fs.readdirSync(__dirname)
	.filter(function (file) {
		return file.indexOf('.') !== 0 && file !== 'index.js'
	})
	.forEach(function (file) {
		var model = sequelize.import(path.join(__dirname, file))
		db[model.name] = model
	})

Object.keys(db).forEach(function (modelName) {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db)
	}
})

//Sync Database
sequelize
	.sync()
	.then(async function () {})
	.catch(function (err) {
		console.log(err, 'Something went wrong with the Database Update!')
	})

// exports
db.Sequelize = Sequelize

module.exports = db

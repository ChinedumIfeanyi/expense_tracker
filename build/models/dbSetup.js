'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbConnect = _mysql2.default.createConnection({
	host: process.env.DBHOST || 'localhost',
	user: process.env.DBUSER || 'root',
	password: process.env.DBPASSWORD || '',
	database: process.env.DBNAME || 'expense'
});

exports.default = dbConnect;
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbConnect = _mysql2.default.createConnection({
	host: process.env.DATABASE_HOST || 'localhost',
	user: process.env.DATABASE_USER || 'root',
	password: process.env.DATABASE_PASSWORD || '',
	database: process.env.DATABASE_URL || 'expense'
});

dbConnect.connect(function (err) {
	if (err) {
		console.log('Database connection error');
	} else {
		console.log('Database connected succesfully');
	}
});

exports.default = dbConnect;
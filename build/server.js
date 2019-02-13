"use strict";

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _connectHistoryApiFallback = require("connect-history-api-fallback");

var _connectHistoryApiFallback2 = _interopRequireDefault(_connectHistoryApiFallback);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _dbSetup = require("./models/dbSetup");

var _dbSetup2 = _interopRequireDefault(_dbSetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
//====
// Database connection


var PORT = process.env.PORT || 8000;

//middleware
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
	extended: false
}));
app.use((0, _cors2.default)());
app.use((0, _connectHistoryApiFallback2.default)());

if (process.env.NODE_ENV === 'production') {

	app.use('/', _express2.default.static(_path2.default.resolve(__dirname, './dist')));
	app.use('*', _express2.default.static(_path2.default.resolve(__dirname, './dist')));

	app.get('*', function (req, res) {
		res.sendFile(_path2.default.resolve(__dirname, './dist/index.html'));
	});
}

app.get("/expense", function (req, res) {
	var query = "SELECT id, value, reason, date FROM expense";
	_dbSetup2.default.query(query, function (err, data) {
		if (err) res.send(err.message);
		res.status(200).json(data);
	});
});

app.post("/expense", function (req, res) {
	var query = "\n\t\tINSERT INTO expense(value, reason, date) values(?,?,?)\n\t";
	_dbSetup2.default.query(query, [req.body.inputValue, req.body.reasonForExpense, new Date()], function (err, response) {
		if (err) console.log(err.message);
		res.status(200).json('data saved');
	});
});

app.get("/expense/:id", function (req, res) {
	var query = "\n\t\tSELECT id, value, reason from expense WHERE id = ?\n\t";
	_dbSetup2.default.query(query, [req.params.id], function (err, data) {
		if (err) res.json(err.message);
		res.status(200).json(data);
	});
});

app.delete('/expense/:id', function (req, res) {
	var query = "\n\t\tDELETE FROM expense WHERE id = ?\n\t";
	_dbSetup2.default.query(query, [req.params.id], function (err, data) {
		if (err) res.json(err.message);
		res.status(201).json('deleted');
	});
});

app.use('/', _express2.default.static(_path2.default.resolve(__dirname, './dist')));
app.use('*', _express2.default.static(_path2.default.resolve(__dirname, './dist')));

app.get('*', function (req, res) {
	res.sendFile(_path2.default.resolve(__dirname, './dist/index.html'));
});

app.listen(PORT, function () {
	return console.log("server booted @ " + PORT);
});
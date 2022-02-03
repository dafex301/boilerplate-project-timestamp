// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// Use bodyparser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve an HTML file
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

// Serve static assets
app.use(express.static(__dirname + '/public'));

// Chain middleware to create timestamp
app.get('/api/:date', function (req, res) {
	let date = req.params.date;
	if (date.match(/^[0-9]+$/)) {
		let unixTime = parseInt(date);
		let utcTime = new Date(unixTime);
		let utcTimeString = utcTime.toUTCString();
		res.json({
			unix: unixTime,
			utc: utcTimeString,
		});
	}
	// If date is a string
	else if (date.match(/(\d|\w)+-\w+-\d+/)) {
		let unixTime = new Date(date).getTime();
		let utcTime = new Date(date).toUTCString();
		res.json({
			unix: unixTime,
			utc: utcTime,
		});
	}
	// If date is invalid
	else {
		res.json({
			error: 'Invalid Date',
		});
	}
});

app.get('/api', function (req, res) {
	let unixTimeNow = new Date().getTime();
	let utcTimeNow = new Date().toUTCString();
	res.json({ unix: unixTimeNow, utc: utcTimeNow });
});

// listen for requests :)
var listener = app.listen(3000, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});

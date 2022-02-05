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
	const dateStr = req.params.date;
	// check if parameter is a number using regex
	if (/^\d+$/.test(dateStr)) {
		console.log('hello');
		const time = parseInt(dateStr);
		return res.json({
			unix: time,
			utc: new Date(time).toUTCString(),
		});
	}
	// check if date is ISO 8601 format
	if (!isNaN(Date.parse(dateStr))) {
		const time = Date.parse(dateStr);
		return res.json({
			unix: time,
			utc: new Date(time).toUTCString(),
		});
	}
	return res.status(400).json({ error: 'Invalid Date' });
});

app.get('/api', function (req, res) {
	let timeNow = new Date();
	res.json({ unix: timeNow.getTime(), utc: timeNow.toUTCString() });
});

// listen for requests :)
var listener = app.listen(3000, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});

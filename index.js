let http = require('http')
let through = require('through')
let request = require('request')
let fs = require('fs')
let argv = require('yargs')
	.default('host', '127.0.0.1')
	.argv
let scheme = 'http://'
let port = argv.port || argv.host === '127.0.0.1' ? 8000 : 80
let destinationUrl = argv.url || scheme + argv.host + ':' + port
let logStream = argv.logfile ? fs.createWriteStream(argv.logfile) : process.stdout

http.createServer((req, res) => {
	logStream.write('\nEcho request headers: \n' + JSON.stringify(req.headers) + '\n')
	for (let header in req.headers) {
    	res.setHeader(header, req.headers[header])
	}
	through(req, logStream, {autoDestroy: false})
 	req.pipe(res)
}).listen(8000)

logStream.write('Listening at http://127.0.0.1:8000')

http.createServer((req, res) => {
	let url = destinationUrl
	if (req.headers['x-destination-url']) {
		url = req.headers['x-destination-url']
	}
	let options = {
    	headers: req.headers,
    	url: url + req.url
	}
	logStream.write('\n Proxing to URL: ' + url + '\n')
	logStream.write('\nProxy request headers: \n' + JSON.stringify(req.headers) + '\n')
	through(req, logStream, {autoDestroy: false})

	let destinationResponse = req.pipe(request(options))

	logStream.write('\nDestination Response headers: \n' + JSON.stringify(destinationResponse.headers) + '\n')
	through(destinationResponse, logStream, {autoDestroy: false})
	destinationResponse.pipe(res)
}).listen(8001)

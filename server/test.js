let net = require('net');
let TcpParser = require('./tcpParser.js').TcpParser;
console.log(TcpParser);

let dynamicTcpParser = new TcpParser(
	json => {
		try {
			let parseJson = JSON.parse(json);
			console.log("livepp_current_pp=" + parseJson.livepp_current_pp);
		} catch (e) {
			console.error("Unexpected error " + e);
		}
	}
);

let staticTcpParser = new TcpParser(
	json => {
		try {
			let parseJson = JSON.parse(json);
			console.log("title" + parseJson.title);
		} catch (e) {
			console.error("Unexpected error " + e);
		}
	}
);

let server_a = net.createServer(function (socket) {
	socket.on('data', function (data_a) {
		console.log(data_a.toString('utf8'))
		staticTcpParser.processTcpParsing(data_a);
	});

});


let server_b = net.createServer(function (socket) {
	socket.on('data', function (data_b) {
		//staticTcpParser.processTcpParsing(data);
		dynamicTcpParser.processTcpParsing(data_b);
	});

});


server_a.listen(7839, '0.0.0.0');
server_b.listen(7840, '0.0.0.0');
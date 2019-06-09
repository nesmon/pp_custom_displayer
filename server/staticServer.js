function staticServ() {
	const fs = require('fs')
	/**
	 * Import modules
	 */
	const net = require('net');
	const TcpParser = require('./tcpParser.js').TcpParser;

	/**
	 * Define constants
	 */
	const PORT = 7839;
	const IP = "0.0.0.0";

	/**
	 *  Instance of tcpParser with the callback to apply when json is acquired.
	 *  //FIXME Encapsulate error in TcpParser class and implement a rescue if offset appear in parsing. Maybe difficult to do. 
	 **/
	const staticTcpParser = new TcpParser(
		json => {
			try {
				const title = require('./../data/static.json')
				console.log(title.np_playing_DL)
				let parseJson = JSON.parse(json);
				let tostring = JSON.stringify(parseJson)
				//console.log(parseJson)
				fs.writeFile('./data/static.json', tostring, (err) => {
					if (err) console.log(err);
					console.log("Successfully Written to File.");
				});


				//console.log("np_all=" + parseJson.np_all);
			} catch (e) {
				console.error("Unexpected error " + e);
			}
		}
	);

	/**
	 * Launch server.
	 */
	net.createServer(socket => socket.on('data', data => staticTcpParser.processTcpParsing(data)))
		.listen(PORT, IP);


}

module.exports = {
	staticServ: staticServ
}
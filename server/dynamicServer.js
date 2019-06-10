function dynamicServ() {

	const eventBus = require('./../module/eventBus');
	/**
	 * Import modules
	 */
	const net = require('net');
	const TcpParser = require('./tcpParser.js').TcpParser;

	/**
	 * Define constants
	 */
	const PORT = 7840;
	const IP = "0.0.0.0";

	/**
	 *  Instance of tcpParser with the callback to apply when json is acquired.
	 *  //FIXME Encapsulate error in TcpParser class and implement a rescue if offset appear in parsing. Maybe difficult to do. 
	 **/
	const dynamicTcpParser = new TcpParser(
		json => {
			try {				
				let parseJson = JSON.parse(json);
				let stringjson = JSON.stringify(parseJson)
				eventBus.publish("PP", stringjson)
			} catch (e) {
				console.error("Unexpected error " + e);
			}
		}
	);

	/**
	 * Launch server dyna serv.
	 */
	net.createServer(socket => socket.on('data', data => dynamicTcpParser.processTcpParsing(data)))
		.listen(PORT, IP);



}


module.exports = {
	dynamicServ: dynamicServ
}
let net = require('net');
let server = net.createServer(function (socket) {
    socket.on('data', function (data) {
        if(!!data){
	//	console.log("data received");
		processData(data);
 
        }else{
          console.warn("data is null");
        }
    });
 
});

  var partialString = "";
  var length = 0;
  
let processData = function(data){
	let buffer = Buffer.from(data);
	if(buffer.length > 0 ){
		for(let i=0;i<buffer.length;i++){
			//get length of frame
			if(length == 0){
				length = buffer[i];
				//console.log("bufferLength ="+buffer[i]);
				continue;
			 }
			 partialString = partialString + String.fromCharCode(buffer[i]);
			// console.log("partialString="+partialString);
			if(partialString.length == length){
				processJson(partialString);
				length=0;
				partialString="";
			}
		}
	}
}

let processJson = function(json){
	try{
		let parseJson = JSON.parse(json);
		console.log(parseJson.livepp_current_pp);
	}catch(e){
		console.error("Unexpected error " +e);
	}
}
 
server.listen(7840, '0.0.0.0');

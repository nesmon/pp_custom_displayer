let net = require('net');

let server = net.createServer(function (socket) {
let num = 0;
    socket.on('data', function (data) {
        textChunk = data.toString('utf8');
        if (textChunk != null){
            console.log("if" + data)  
            str = JSON.parse(textChunk.substring(1))
        }else{
            console.log("else")
        }
        //str = JSON.parse(textChunk.substring(1))
        console.log(str);
        console.log(num++);
        //socket.write(textChunk);
    });

    // let str = reading.toString('utf8');
    // console.log( "String = %s", str );
    // let obj = JSON.parse( str.substring(0, str.length-1) );
  
  
    // let str2 = JSON.stringify(obj, null, 4); // Reverse conversion
    // console.log("Obj = %s", str2);  

});

server.listen(7840, '0.0.0.0');


//         //textChunkP = textChunkS.split('}')[0];
// let net = require('net');

// var process = function(data){
// var timestamp = Date.now();
// 	console.log(timestamp+":"+data);
// 	    textChunk = data.toString('utf8');
//         str = JSON.parse(textChunk.substring(1))
//         console.log(timestamp+":"+str.livepp_current_pp);
		

// };

// let server = net.createServer(function (socket) {

//     socket.on('data', function (data) {
// 		process(data);
//     });

// });

// server.listen(7840, '0.0.0.0');
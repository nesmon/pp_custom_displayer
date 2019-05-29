let net = require('net');
let server_dyna = net.createServer(function (socket) {
    socket.on('data', function (data) {
        if (!!data) {
            //	console.log("data received");
            processData(data);

        } else {
            console.warn("data is null");
        }
    });

});

let server_static = net.createServer(function (socket) {
    socket.on('data', function (data_s) {
        if (!!data_s) {
            //	console.log("data received");
            console.log(data_s.toString('utf8'));
            processData(data_s)

        } else {
            console.warn("data is null");
        }
    });

});


let partialString = "";
let length = 0;

let processData = function (data) {
    let buffer = Buffer.from(data);
    if (buffer.length > 0) {
        console.log(buffer.length)
        for (let i = 0; i < buffer.length; i++) {
            //get length of frame
            if (length == 0) {
                length = buffer[i];
                console.log("bufferLength=" + buffer[i]);
                continue;
            }
            partialString = partialString + String.fromCharCode(buffer[i]);
            console.log("partialString=" + partialString);
            if (partialString.length == length) {
                processJson(partialString);
                length = 0;
                partialString = "";
            }
        }
    }
}

let processJson = function (json) {
    try {
        let parseJson = JSON.parse(json);
        console.log(parseJson.title);
    } catch (e) {
        console.error("Unexpected error " + e);
    }
}

//server_dyna.listen(7840, '0.0.0.0');

server_static.listen(7839, '0.0.0.0');
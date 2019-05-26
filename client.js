let net = require('net');

let server = net.createServer(function (socket) {
    socket.on('data', function (data) {
        textChunk = data.toString('utf8');
        textChunkJ = JSON.parse(textChunk.substring(1)).pp;
        console.log(textChunkJ);
        //socket.write(textChunk);
    });
});

server.listen(7840, '0.0.0.0');
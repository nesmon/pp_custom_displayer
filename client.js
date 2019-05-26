let net = require('net');

let server = net.createServer(function (socket) {
    socket.on('data', function (data) {
        textChunk = data.toString('utf8');
        //str = JSON.parse(textChunk.substring(1))

        //str = JSON.parse(textChunk.substring(1))
        console.log(textChunk);
        //socket.write(textChunk);
    });
    //Make function for use this like in s.js
    //�{"np_all":"RIOT - Overkill [Eternal Death] CS:3,8 AR:9,6 OD:9,2 HP:5","np_playing_details":"CS:3,8 AR:9,6 OD:9,2 HP:5","np_playing_DL":"http://osu.ppy.sh/b/2004799","current_mods":"","title":"RIOT - Overkill [Sotarks]"}
   

});

server.listen(7839, '0.0.0.0');

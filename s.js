let net = require('net');
 
let server = net.createServer(function (socket) {
 
    socket.on('data', function (data) {
        if(!!data){
            let stringData = data.toString('utf8').trim();
            if(!!stringData.length && !!stringData.length && stringData.length > 0){
                try{
                  let matchRegex = stringData.match('\{" *livepp_current_pp" *: *"([0-9\.]+)" *\}');
                  if(matchRegex != null && matchRegex.length > 1){
                    console.log("matchFound:"+matchRegex[1]);
                  }else{
                    console.warn("could not extract livepp_current_app");
                  }
                 
                } catch(e){
                  console.error("Unexpected error :"+e+"with stringData :"+stringData);
                }
              }else{
                console.warn("empty String received");
              }
 
        }else{
          console.warn("data is null");
        }
    });
 
});

server.listen(7840, '0.0.0.0');

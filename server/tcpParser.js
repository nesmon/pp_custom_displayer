class TcpParser{
	
	constructor(callback){
		this.partialString = "";
		this.length = 0;
		this.callback = callback;
	}
	
	processTcpParsing(data){
		if(!!data){
			let buffer = Buffer.from(data);
			if(buffer.length > 1 ){
				for(let i=0;i<buffer.length;i++){
					//get length of frame
					if(this.length == 0){
						this.length = buffer[i];
						//console.log("bufferLength ="+buffer[i]);
						continue;
					}
					this.partialString = this.partialString + String.fromCharCode(buffer[i]);
					// console.log("partialString="+partialString);
					if(this.partialString.length == this.length){
						this.callback(this.partialString);
						this.length=0;
						this.partialString="";
					}
				}
			}
        } else{
			console.warn("data is null");
		}
	}
}
 module.exports.TcpParser = TcpParser;
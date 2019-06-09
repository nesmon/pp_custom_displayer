/**
* Custom TcpParser which permit to accumulate frames until a complete json is acquired. 
* Then the callback function is called with the json in argument.
**/
class TcpParser{
	
	/**
	* Constructor
	* @param callback : The function called on the json after completion.
	**/
	constructor(callback){
	    /** ASCII code of "{" */
	    this.START_JSON_ASCII_CODE = 123;
		/** ASCII code of "}" */
		this.END_JSON_ASCII_CODE = 125;
		/** String corresponding to the accumulate bytes from the first "{" received */
		this.partialString = "";
		/** counter of "{" received */
		this.startJsonCount = 0;
		/** counter of "}" received */
		this.endJsonCount = 0;
		/** callback to call on json when it is completed*/
		this.callback = callback;
	}
	
	/**
	* Process the parsing of tcp input.
	* When json is completed, $this.callback is called on it.
	* @data tcp buffer received.
	*/
	processTcpParsing(data){
		if(!!data){
			let buffer = Buffer.from(data);
			if(buffer.length > 0 ){
				for(let i=0;i<buffer.length;i++){
						// count "{" and "}" getted.
					   if(this.START_JSON_ASCII_CODE == buffer[i]){
							this.startJsonCount++;
						}else if(this.END_JSON_ASCII_CODE == buffer[i]){
							this.endJsonCount++;
						}
					//if no "{" received, get the next byte.
					if(this.startJsonCount == 0){	
						continue;
					}
					//Accumulate char in a string
					this.partialString = this.partialString + String.fromCharCode(buffer[i]);
					//When number of "{" getted and number of "}" getted is equal , then it mean the json is completed.
					if(this.startJsonCount == this.endJsonCount){
						//call the callback on json
						this.callback(this.partialString);
						//reset counters
						this.startJsonCount = 0;
						this.endJsonCount = 0;
						//reset accumulate string
						this.partialString = "";
					}
				}
			}
        } else{
			console.warn("data is null");
		}
	}
}
 module.exports.TcpParser = TcpParser;
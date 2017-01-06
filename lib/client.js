module.exports = function* (next){
	var url = this.request.url;
	if(url.indexOf('html')>-1){
		this.append('script','localhost/client.js')
	}

	yield next;
}
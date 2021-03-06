(function(){


	if(!window.EventSource){
		console.warn('your browser currently can\'t support this typeof live reload');
		return;
	}


	function processMessage(event){

		if(event.action === 'action'){

			console.log('time to reload');

		}

	}


	function connect(){

		var source = new window.EventSource('/');


		var lastActivity = new Date();

		source.onopen = handleOnline;
		source.onmessage = handleMessage;
		source.onerror = handleDisconnect;

		/*var timer = setInterval(function() {
			if ((new Date() - lastActivity) > 6000) {
				handleDisconnect();
			}
		}, 3000);*/

		function handleOnline() {
			/*if (options.log)*/ console.log("[HMR] connected");
			lastActivity = new Date();
		}

		function handleMessage(event) {

			console.log('hiiiiiiiiiiiiiiiiii');

			lastActivity = new Date();
			if (event.data == "") {
				return;
			}
			try {
				processMessage(event);
			} catch (ex) {
				/*if (options.warn) {*/
					console.warn("Invalid HMR message: " + event.data + "\n" + ex);
				// }
			}
		}

		function handleDisconnect() {
			// clearInterval(timer);
			source.close();
			setTimeout(function() { connect(source); }, 1000);
		}
	}



	connect();


})()

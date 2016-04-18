var net = require('net');

var cmd = {
	command : process.argv[2],
	args: []
}

// get command arguments
for (var i = 3; i < process.argv.length; i++){
	cmd.args.push(process.argv[i]);
}

//console.log(cmd.command.toString());

// create a socket connection
var socket = new net.Socket();

// connect to localhsot:56789 
socket.connect(56789,'localhost', function (){
	// connect success
	console.log('Connected');
	// send data to server
	socket.write(JSON.stringify(cmd));
	//socket.write('cmd /c dir');
	// receive result form server
	socket.on('data',function(data){
		console.log(data.toString());
	});
	// end connection
	socket.on('end',function(){
		process.exit();
	});
});
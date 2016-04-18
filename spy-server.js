var net = require('net');
var child_process = require('child_process');

// create server
var server = net.createServer();

// listen port 56789
server.listen(56789);

// wait connection
server.on('connection', function(socket){
	var child = null;
	var cmdStr = '';
	
	console.log('New connection was established');
	
	// receive data
	socket.on('data', function(data){
		//cmdStr += data.toString();
		// check end of line
		//if (data.toString().indexOf('\n') == -1) {
			// not yet
		//	console.log('not yet');
		//	return;
		//}
		
		var cmd = JSON.parse(data);
		cmdStr += cmd.command;
		cmdStr += ' ';
		cmdStr += cmd.args;
		console.log(cmdStr);
		// run command and arguments
		//child = child_process.spawn(cmd.commad,cmd.args);
		child = child_process.exec(cmdStr);
		
		// receive result
		child.stdout.on('data',function(output){
			socket.write(output);
		});
		
		child.on('end',function(){
			socket.destroy();
			child = null;
		});
	
	});
	
	socket.on('end',function(){
		if (child)
			child.kill();
	});
});
	

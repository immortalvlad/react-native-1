var http = require('http');

const PORT = 80;

function requesthandler(req,res){
	res.end('Hello form here');
}

var server  = http.createServer(requesthandler);

server.listen(PORT, function(){
	console.log(' server listen on porn : ${PORT}');
});
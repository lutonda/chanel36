var http = require('http');

var url = require('url');

var routes={}
var server=http.createServer(function(req,res){
    var path=url.parse(req.url,true).pathname;

    var trimedPath=path.replace(/^\/+|\/+$/g,'');
    res.setHeader('Content-Type','application/json')
    console.log(trimedPath);
    res.end(JSON.stringify({'message':'hello world'}));
})

server.listen('3000',function(){
    console.log('Server listning on port 3000')
})


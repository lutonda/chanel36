/**
 * Main file for My simple Http Api
 * Author: Sebastiao Lutonda
 * Date: 2021-03-31
 * Descriptions: Simple HTTP Api built with nodejs
 * 
 */


 // Dependencies
var http = require('http');
var url = require('url');
var StringDecoder=require('string_decoder').StringDecoder;



 // Respond to all request    
var server=http.createServer(function(req,res){


    // getting and pasing the requested HTTP path
    var parseUrl=url.parse(req.url,true);
    var path=parseUrl.pathname;
    var trimmedPath=path.replace(/^\/+|\/+$/g,'');
    var queryString=parseUrl.query;
    var method=req.method.toLower;
    var headers=req.headers;

    var decoder= new StringDecoder('utf-8');
    var buffer='';
    req.on('data',function(data){
        buffer+=decoder.write(data)
    })
    req.on('end',function(){
        buffer+=decoder.end()

        var chosenHandler=typeof(handlers[trimmedPath])!='undefined' ? handlers[trimmedPath] : handlers.notfound

        var data={
            'trimmedPath':trimmedPath,
            'queryString':queryString,
            'method':method,
            'headers':headers,
            'payload':buffer
        }


        console.log(typeof(handlers[trimmedPath])!=='undefined');
        chosenHandler(data,function(statusCode, payload){
            statusCode=typeof(statusCode)==='number' ? statusCode : 200;

            payload=typeof(payload)==='object' ? payload : {};

            var payloadString=JSON.stringify(payload);

            res.writeHead(statusCode);
            res.end(payloadString);

            console.log('Returnig this reponse: ', statusCode, payloadString)
        })
    })
    // Telling the client that we are sending JSON
    res.setHeader('Content-Type','application/json')
    
})

// listning to the port
server.listen('3000',function(){
    console.log('Server listning on port 3000')
})


var handlers={}

handlers.hello=function(data,callback){
    callback(200, {message:'Hello! Welcome to my simple HTTP nodejs Application'})
}


handlers.notfound=function(data,callback){
    callback(404)
}

var router={
    'hello' : handlers.hello
}

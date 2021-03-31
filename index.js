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


// Functions 
var helloFunction=function(res,req){
        res.end(JSON.stringify({'message':'Hello! Welcome to my simple HTTP nodejs Application'}));    
    }
var unknowFunction=function(res,req){
        res.end(JSON.stringify({'message':'unknow path'}));    
    }

 // Respond to all request    
var server=http.createServer(function(req,res){


    // getting and pasing the requested HTTP path
    var path=url.parse(req.url,true).pathname;
    var trimedPath=path.replace(/^\/+|\/+$/g,'');
    
    // Telling the client that we are sending JSON
    res.setHeader('Content-Type','application/json')
    
    // check the path
    if(trimedPath=='hello'){
        helloFunction(res,req)
    }else{
        unknowFunction(res,req)
    }
    
})

// listning to the port
server.listen('3000',function(){
    console.log('Server listning on port 3000')
})


var express = require('express');
var fs = require('fs');
var logger = require('morgan');
var async = require('async');
var ejs = require('ejs'); 
var http = require('http');

 
// take a list of files from the command line
// now we can run our app like:
// node app.js file1.js file2.js file3.js
// and it will watch all three files
var files = Array.prototype.slice.call(process.argv, 2);
console.log(files);
 
// create the express app
var app = express();
app.set('view engine', 'ejs');
var server = http.createServer(app);
var io = require('socket.io').listen(server); 
 
// all environments
app.use(logger('dev'));
 
// listen on port 1234
app.listen(1234);
 

files.forEach(function(filename){
    fs.watchFile(filename, {interval:10}, function(prev, curr) {
      // display an update was made, then console.log the new updated file!
      fs.readFile(filename, function(err,data) {
        io.sockets.emit("filechanged", { filename: filename, filetext: data.toString() });
        console.log({ filename: filename, filetext: data.toString() })
    });
  })
});








app.get("/", function(request, response) {
  var mapOneFileToOneObject = function(file, doneWithTurningIntoObject) {
      fs.readFile(file, function(err, oneFileBuffer) {
        oneFileData = "hello";
        var oneFileData = {id: file.replace(/[^0-9]/ig, ""), data: oneFileBuffer.toString(), filename: file};
        console.log(oneFileData);
        doneWithTurningIntoObject(err, oneFileData);
      });
    
  };



  async.mapSeries(files, mapOneFileToOneObject, function(err, results) {
    response.render('filelist', {files: results});
  });  
});
  
  






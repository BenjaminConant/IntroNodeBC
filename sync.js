//console.log("Node starting...");

var nodeStartingFunctionFileCode = require("./nodeStartingFunction");
//console.log(nodeStartingFunctionFileCode);
nodeStartingFunctionFileCode.nodeStartingFunction();
var fs = require('fs');
//console.log(fs);
//console.log(fs.readFileSync('./file1.txt'));
var buffer = ''
fs.readFile('./file1.txt', function(err, data) {
     buffer = data.toString();  // buffer object
     console.log(buffer);
});

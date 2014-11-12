console.log("Node starting...");
var buffer = '';
var fs = require('fs');
fs.readFile('./file1.txt', function(err, data) {
     buffer = data.toString();  // buffer object
     console.log(buffer);
});
 
 
fs.watchFile('./file1.txt', {interval:10}, function(prev, curr) {
  console.log(fs.readFile('./curr', function(err, data){
  				x = data.toString();
  				console.log(x);
  			}
  	));
  // display an update was made, then console.log the new updated file!
  
});

process.argv.forEach(function(el, index){
		if(index > 1){
			console.log(el)}
})
//console.log(process.argv);








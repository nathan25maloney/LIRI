var keys = require("./keys.js");

var args = process.argv.slice(2);

switch (args[0]){
	case "my-tweets":
		tweets();
		break;
	case "spotify-this-song":
		spotify();
		break;
	case "movie-this":
		movie();
		break;
	case "do-what-it-says":
		doWhat();
		break;
	case default:
	console.log("you did not enter a correct command");
		break;
}

function tweets(){

}
function spotify(){

}
function movie(){

}
function doWhat(){

}

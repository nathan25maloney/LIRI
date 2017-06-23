var keys = require("./keys.js");
var fs = require('fs');
var twit = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');

var spot = new spotify({
	id: "6cf2391b504e4701ada90ca585616a66",
	secret: "30f727e71fc8478fa5020fa565aba93d"
});

var args = process.argv.slice(2);

switch (args[0]){
	case "my-tweets":
		tweets(args.slice(1));
		break;
	case "spotify-this-song":
		spotifyFun(args.slice(1));
		break;
	case "movie-this":
		movie(args.slice(1));
		break;
	case "do-what-it-says":
		doWhat();
		break;
	default:
		console.log("you did not enter a correct command");
		break;
}

function tweets(twitterArg){
	fs.appendFile('log.txt', 'my-tweets\n\n', function(err) {
        if (err) {
			console.log(err);
		} 
	});
	var client = new twit({
		consumer_key: 'p79wPZEhjv2RO9V815SosQyFX',
		consumer_secret: 'aX2Xc5i8rzdYW7GTpsQbcFwdJal5e8lmELTizbMzs6ZwRzKPqk',
		access_token_key: '876617127771357184-Yz5bLdXbapt3Mpq1nuISNximbU5CBwd',
		access_token_secret: '0ahGNvAiEWoTRwsuGJUSVhSeDlEk97X1TUE47W3n68FXa'
	});
	if(twitterArg[0] === undefined){
		var params = {screen_name: 'NathanMaloney12'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
			if (!error) {
				if(tweets.length <21) {
					for (var i = 0; i < tweets.length; i++) {
						console.log("");
						console.log("Result number "+(i+1));
						console.log("The tweet's text: "+tweets[i].text);
						console.log("The tweet's time of creation: "+tweets[i].created_at);
						console.log("");
						console.log(""); 
						fs.appendFile('log.txt', tweets[i].text+', created at ', function(err) {
							if (err) {
								console.log(err);
							}
						});
						fs.appendFile('log.txt', tweets[i].created_at+'\n\n', function(err) {
							if (err) {
								console.log(err);
							}
						});
					}
				} else {
					for (var i = 0; i < 21; i++) {
						console.log("");
						console.log("Result number "+(i+1));
						console.log("The tweet's text: "+tweets[i].text);
						console.log("The tweet's time of creation: "+tweets[i].created_at);
						console.log("");
						console.log("");
						fs.appendFile('log.txt', tweets[i].text+'\n', function(err) {
							if (err) {
								console.log(err);
							}
						});
						fs.appendFile('log.txt', tweets[i].created_at+'\n', function(err) {
							if (err) {
								console.log(err);
							}
						}); 
					}
				}

			} 
		})
	} else {
		console.log("you cannot enter anything after the my-tweets command!");
	}
	
}

function spotifyWrite(data,i){
	fs.appendFile('log.txt', data.tracks.items[i].name+', ', function(err) {
			        if (err) {
						console.log(err);
					} 
				});
				fs.appendFile('log.txt', data.tracks.items[i].album.name+', ', function(err) {
			        if (err) {
						console.log(err);
					} 
				});
				fs.appendFile('log.txt', data.tracks.items[i].album.artists[0].name+', ', function(err) {
			        if (err) {
						console.log(err);
					} 
				});
				fs.appendFile('log.txt', data.tracks.items[i].popularity+', ', function(err) {
			        if (err) {
						console.log(err);
					} 
				});
				fs.appendFile('log.txt', data.tracks.items[i].explicit+'\n\n', function(err) {
			        if (err) {
						console.log(err);
					} 
				});
}

function spotifyFun(spotifyArg){
	fs.appendFile('log.txt', 'spotify-this-song '+spotifyArg+'\n\n', function(err) {
        if (err) {
			console.log(err);
		} 
	});
	if(spotifyArg[0] === undefined || spotifyArg[0] === " "){
		spot.search({ type: 'track', query: 'The Sign',limit: 5 }, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
			for (var i = 4; i < 5; i++) { 
				console.log("");
				console.log("Result number 1 and only");
				console.log("Name of the song: "+JSON.stringify(data.tracks.items[i].name,null,7));
				console.log("Name of the album: "+JSON.stringify(data.tracks.items[i].album.name,null,7));
				console.log("Name of the artist/artists: "+JSON.stringify(data.tracks.items[i].album.artists[0].name,null,7))
				console.log("Popularity of the song: "+JSON.stringify(data.tracks.items[i].popularity,null,7));
				console.log("Explicit: "+JSON.stringify(data.tracks.items[i].explicit,null,7));
				console.log("");
				console.log(""); 
				spotifyWrite(data,i);
			}
		});
	} else {

		spot.search({ type: 'track', query: spotifyArg, limit: 10 }, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
		for (var i = 0; i < 10; i++) {
			console.log("");
			console.log("Result number "+(i+1));
			console.log("Name of the song: "+JSON.stringify(data.tracks.items[i].name,null,7));
			console.log("Name of the album: "+JSON.stringify(data.tracks.items[i].album.name,null,7));
			console.log("Name of the artist/artists: "+JSON.stringify(data.tracks.items[i].album.artists[0].name,null,7))
			console.log("Popularity of the song: "+JSON.stringify(data.tracks.items[i].popularity,null,7));
			console.log("Explicit: "+JSON.stringify(data.tracks.items[i].explicit,null,7));
			console.log("");
			console.log("");
			spotifyWrite(data,i);
		}
		
		});
	}
	
}

function movieWrite(info){
	for(var key in info){
		  		//console.log(key +": "+ info[key]);
		  		
		  		switch (info[key]) {
		  			case "Title":
		  				console.log("Title: "+ info[parseInt(key)+2]);
		  				fs.appendFile('log.txt', "Title: "+ info[parseInt(key)+2]+"\n\n", function(err) {
					        if (err) {
								console.log(err);
							} 
						});
		  				break;
		  			case "Year":
		  				console.log("Year: "+ info[parseInt(key)+2]);
		  				fs.appendFile('log.txt', "Year: "+ info[parseInt(key)+2]+"\n\n", function(err) {
					        if (err) {
								console.log(err);
							} 
						});
		  				break;
		  			case "imdbRating":
		  				console.log("IMDB rating: "+ info[parseInt(key)+2]);
		  				fs.appendFile('log.txt', "Year: "+ info[parseInt(key)+2]+"\n\n", function(err) {
					        if (err) {
								console.log(err);
							} 
						});
		  				break;
		  			case "Country":
		  				console.log("Country: "+info[parseInt(key)+2]);
		  				fs.appendFile('log.txt', "Country: "+info[parseInt(key)+2]+"\n\n", function(err) {
					        if (err) {
								console.log(err);
							} 
						});
		  				break;
		  			case "Language":
		  				console.log("Language: "+info[parseInt(key)+2]);
		  				fs.appendFile('log.txt', "Language: "+info[parseInt(key)+2]+"\n\n", function(err) {
					        if (err) {
								console.log(err);
							} 
						});
		  				break;
		  			case "Plot":
		  				console.log("Plot: "+info[parseInt(key)+2]);
		  				fs.appendFile('log.txt', "Plot: "+info[parseInt(key)+2]+"\n\n", function(err) {
					        if (err) {
								console.log(err);
							} 
						});
		  				break;
		  			case "Actors":
		  				console.log("Actors: "+info[parseInt(key)+2]);
		  				fs.appendFile('log.txt', "Actors: "+info[parseInt(key)+2]+"\n\n", function(err) {
					        if (err) {
								console.log(err);
							} 
						});
		  				break;
		  			case "tomatoURL":
		  				console.log("Rotten Tomatoes URL: "+info[parseInt(key)+2]);
		  				fs.appendFile('log.txt', "Rotten Tomatoes URL: "+info[parseInt(key)+2]+"\n\n", function(err) {
					        if (err) {
								console.log(err);
							} 
						});
		  				break;
		  			default:
		  				break;


		  		}
		  	}
}

function movie(movieArg){
	fs.appendFile('log.txt', 'movie-this '+movieArg+'\n\n', function(err) {
        if (err) {
			console.log(err);
		} 
	});

	if (movieArg[0] === undefined) {
		request('http://www.omdbapi.com/?apikey=40e9cece&t=Mr+Nobody&plot=full&tomatoes=true&r=json', function (error, response, data) {
		  	var info = data.split('"');
		  	movieWrite(info);


		})

	} else {

		request('http://www.omdbapi.com/?apikey=40e9cece&t='+movieArg+'&plot=full&tomatoes=true&r=json', function (error, response, data) {
		  	var info = data.split('"');
		  	movieWrite(info);
		  	
		})
	}
	
}


function doWhat(){
	
	fs.readFile('random.txt', 'utf-8', (err,data) => {
 	
	 	if (err) {
	 		return console.log("you done messed up A A Ron");
		}
		if(data === ""){
			console.log("You haven't made your first deposit J quelen");
		} else {
			var output = data.split(' ');
			console.log(output[0]);
			switch (output[0]){
			case "my-tweets":
				tweets(output.slice(1));
				break;
			case "spotify-this-song":
				spotifyFun(output.slice(1));
				break;
			case "movie-this":
				movie(output.slice(1));
				break;
			default:
				console.log("you did not enter a correct command");
				break;
			}
			
		}

	
	})
}


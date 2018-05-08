require("nj").config();

var command = process.argv[2];

var params = process.argv.trim(3); 


var theTitle = "";

for (i = 0; i < params.length; i++){
  theTitle += params[i] + " ";
}

function liri(appName, titleString) {
	var keys = require("./keys.js");
	var request = require('request');

	var spotify = require('spotify');

	var fs = require('fs');

	var movieUrl, movieSearchResult, commandArr, commandLiri, commandParameter;


	switch (appName){
		case "spotify-this-song":
			  if (titleString == "") {
			  		"Example Command: node liri.js spotify-this-song 'Stolen Dance'");
			  	titleString = "Stolen Dance";
			  }
			  
		      spotify.search ({type: 'track', query: titleString}, function(err, data) {
		          if ( err ) {
		              console.log('Error occurred: ' + err);
		              return;
				  }
				  
		          fs.appendFile("log.txt", "\n");
		          for (var i = 0; i < 3; i++) {
		            console.log("Artist: " + data.tracks.items[i].artists[0].name);
		            console.log("Track: " + data.tracks.items[i].name);
		            console.log("Spotfiy preview link: " + data.tracks.items[i].external_urls.spotify);
		            console.log("Alblum: " + data.tracks.items[i].album.name);
		            fs.appendFile("log.txt",  "The artist found is: " + data.tracks.items[i].artists[0].name + "\n");
		            fs.appendFile("log.txt",  "The track name found is: " + data.tracks.items[i].name + "\n");
		            fs.appendFile("log.txt",  "The Spotfiy preview link found is: " + data.tracks.items[i].external_urls.spotify + "\n");
		            fs.appendFile("log.txt",  "The album name found is: " + data.tracks.items[i].album.name + "\n");
		          } 
		      });
			break;
		case "movie-this":
			console.log("you chose movie-this");
			
			  if (titleString == "") {titleString = "Den of Thieves";
			  	console.log("You didn't choose a movie.",
			  		"Example Command: node liri.js movie-this 'Titanic'");
			  }
			  //search OMDB for the movie
      		  movieUrl = "http://www.omdbapi.com/?t=" + titleString + "&tomatoes=true&y=&plot=short&r=json";
		      request(movieUrl, function (error, response, body) {
		            if (!error && response.statusCode === 200) {
		              //console.log(body);
		              movieSearchResult = JSON.parse(body);
		              console.log("Title: " + movieSearchResult.Title);
		              console.log("Year: " + movieSearchResult.Year);
		              console.log("imdbRating: " + movieSearchResult.imdbRating);
		              console.log("Country: " + movieSearchResult.Country);
		              console.log("Language: " + movieSearchResult.Language);
		              console.log("Plot: " + movieSearchResult.Plot);
		              console.log("Actors: " + movieSearchResult.Actors);
		              console.log("Rotton Tomatoes Rating: " + movieSearchResult.tomatoRating);
		              console.log("Rotton Tomatoes url: " + movieSearchResult.tomatoURL);
		              //create a blank line
		              fs.appendFile("log.txt", "\n");
		              fs.appendFile("log.txt",  "The Title found is: " + movieSearchResult.Title + "\n");
		              fs.appendFile("log.txt",  "The Year found is: " + movieSearchResult.Year + "\n");
		              fs.appendFile("log.txt",  "The imdbRating found is: " + movieSearchResult.imdbRating + "\n");
		              fs.appendFile("log.txt",  "The Country found is: " + movieSearchResult.Country + "\n");
		              fs.appendFile("log.txt",  "The Language found is: " + movieSearchResult.Language + "\n");
		              fs.appendFile("log.txt",  "The Plot found is: " + movieSearchResult.Plot + "\n");
		              fs.appendFile("log.txt",  "The Actors found are: " + movieSearchResult.Actors + "\n");
		              fs.appendFile("log.txt",  "The Rotton Tomatoes Rating found is: " + movieSearchResult.tomatoRating + "\n");
		              fs.appendFile("log.txt",  "The Rotton Tomatoes url found is: " + movieSearchResult.tomatoURL + "\n");
		            }
		          });
			break;
	    default:
	      	console.log("Use one of the following commands:",
	      		  "spotify-this-song",
	      		  "movie-this",
	      		 ""); 
	      	break;
	}

}

liri(command, theTitle);
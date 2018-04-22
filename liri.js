require("dotenv").config();

var command = process.argv[2];

// get the second text passed to the command line
// slice is removing spaces before and after
var params = process.argv.slice(3); 

// will be used to store the "params" array output in a sentence
var theTitle = "";
// make a sentence from the "params" array
for (i = 0; i < params.length; i++){
  theTitle += params[i] + " ";
}

function liriApp(appName, titleString) {

	// we are including the keys.js for twitter oauth credentials
	// we put it inside of the function for security (scoping) reasons
	var keys = require("./keys.js");

	// include the npm package "request"
	// this is used to make a get request to the APIs: OMDB
	var request = require('request');


	// include the npm package "spotify"
	var spotify = require('spotify');

	// include the npm package "fs"
	// this is used to read and write actual files to the file system
	var fs = require('fs');

	var movieUrl, movieSearchResult, commandArr, commandLiri, commandParameter;


	switch (appName){
		case "spotify-this-song":
			console.log("you chose spotify-this-song");
			  //if titleString (song name) is empty, use default song
			  if (titleString == "") {
			  	console.log("You didn't choose a song.",
			  		"Example Command: node liri.js spotify-this-song 'we will rock you'");
			  	titleString = "The Sign by Ace of Base";
			  }
			  //search spotify for the song
		      spotify.search ({type: 'track', query: titleString}, function(err, data) {
		          if ( err ) {
		              console.log('Error occurred: ' + err);
		              return;
		          }
		          //console.log(data);
		          //create a blank line
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
			  //if titleString (movie name) is empty, use default movie
			  if (titleString == "") {titleString = "Mr Nobody";
			  	console.log("You didn't choose a movie.",
			  		"Example Command: node liri.js movie-this 'irobot'");
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
		case "do-what-it-says":
			console.log("you chose do-what-it-says");	
			  //read in the file random.txt
		      fs.readFile("random.txt", "utf8", function(error, commandData) {
		          commandArr = commandData.split('\|');
		          commandLiri = commandArr[0];
		          commandParameter = commandArr[1];
		          liriApp(commandLiri, commandParameter);
		          console.log("The random.txt command is: " + commandParameter);
		          console.log("the random.txt search text is " + commandLiri);
		          	fs.appendFile("log.txt", "\n");
		          	fs.appendFile("log.txt",  "The random.txt command found is: " + commandParameter + "\n");
		          	fs.appendFile("log.txt",  "The random.txt search text found is " + commandLiri + "\n");
		      });  
			break;
	    default:
	      	console.log("You did not specify a command and argurment.",
	      		"Use one of the following commands:",
	      		  "spotify-this-song",
	      		  "movie-this",
	      		  "do-what-it-says",
	      		 ""); 
	      	break;
	}

}

liriApp(command, theTitle);
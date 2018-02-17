require('dotenv').load();
var express = require('express');
const app = express();

var Twitter = require('twit');
var chunk = require('lodash/chunk');
var async = require('async');
var when = require ('when');
var fs = require('fs');

var config = {
		
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token: process.env.TWITTER_ACCESS_TOKEN,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
	timeout_ms: 60*1000

};
var T = new Twitter(config);

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/mediafrom/:username", function (request, response) {

   let mediaResults = [];
   T.get('statuses/user_timeline', { screen_name: request.params.username, count: 75 }, function (err, data, response){
     
    // the twitter api is so dumb
     if( !data.errors && !data.error ) {
      data.map(
        function(tweet){

          if (tweet.entities.media) {

            tweet.entities.media.map(
              function(item){
                mediaResults.push(item.media_url_https);
              }
            );

          }

        }
      );
     }

	}).then(function(){
     
    if (mediaResults.length == 0){
    
      response.send('error');
      
    } else {
      
      // catch errors for accounts that do not exist
      response.send(mediaResults.reverse());
      
    }
		
	});
	
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
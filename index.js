// modules

	  require('dotenv').load();

var Twit = require('twit');
var chunk = require('lodash/chunk');

// parameters
var config = {

	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token: process.env.TWITTER_ACCESS_TOKEN,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
	timeout_ms: 60*1000

};
var targetUser = 'zachkrall';
var params = {

	screen_name: targetUser,
	count: 5000
	// skip_status: true,
	// include_user_entities: false

};

// request data
var followingId = [];
var followingList = [];
var Twitter = new Twit(config);
var niceArray;

function first(){
	return new Promise(function(resolve, reject){

		Twitter.get('friends/ids', params, function (err, data, response) {
			for ( let i=0; i<data.ids.length; i++ ) {

				let followingUser = data.ids[i];
				followingId.push(followingUser);

			}
		}).then(function(){
			console.log('following: ' + followingId.length);
			resolve();
		});
	  });
}

function second(){
	return new Promise(function(resolve, reject){
		niceArray = chunk(followingId,100);
		console.log('niceArray: ' + niceArray.length);
		resolve();
	});
}

function third(){
	return new Promise(function(resolve, reject){
		niceArray.map(function(array){

			Twitter.get('users/lookup', { user_id: array }, function (err, data, response) {
				 if(err){
					 console.log(error);
				 } else {
				 data.forEach(function(item){
					 followingList.push(item.screen_name);
					 console.log(item.screen_name);
				 });
			 	}
			});

			resolve();
		});
	});
}

function fourth(){
	return new Promise(function(resolve, reject){
		console.log('list length: ' + followingList.length);
		resolve();
	});
}

first().then(second).then(third).then(fourth);

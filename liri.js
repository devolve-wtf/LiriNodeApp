var command = process.argv[2];
var query_value = process.argv[3];

const request = require('request');
const fs = require('fs');

const TwitterAPI = require('twitter');
const twitter = new TwitterAPI({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
const twitter_params = {screen_name:'kenput3r'};

const SpotifyAPI = require('node-spotify-api');
const spotify = new SpotifyAPI({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

const commands = {
    'my-tweets': function() {
        twitter.get('statuses/user_timeline', twitter_params, function(error, tweets, response) {
            if(!error) {
                for(tweet in tweets) {
                    console.log();
                    console.log('@' + tweets[tweet].user.name);
                    console.log(tweets[tweet].created_at);
                    console.log('--');
                    console.log(tweets[tweet].text);
                    
                }
            };
        })
    },
    'spotify-this-song': function() {
        spotify.search({ type: 'track', query: query_value, limit: 5 }, function(err, data) {
            if(!err) {
                let tracks = data.tracks.items;
                let results_count = tracks.length;
                console.log();
                console.log(`Top ${results_count} results on Spotify`);
                for(track in tracks) {
                    let song = tracks[track];
                    console.log();
                    console.log(`Title: \t${song.name}`);
                    console.log(`Album: \t${song.album.name}`);
                    console.log(`Artist:\t${song.album.artists[0].name}`);
                    console.log(`URL: \t${song.preview_url}`);
                }
            }else{
                console.log('Looks like there was an erorr! ' + err);
            }
        });
    },
    'movie-this': function() {
        if(!query_value) {
            query_value = 'Mr. Nobody';
        }
        let url = `http://www.omdbapi.com/?t=${query_value}&plot=short&apikey=${process.env.OMDB_API_KEY}`;
        request(url, function(err, res, movie) {
            if(!err && res.statusCode === 200) {
                console.log();
                console.log(`Title: \t\t${JSON.parse(movie).Title}`);
                console.log(`Year: \t\t${JSON.parse(movie).Year}`);
                console.log(`IMDB: \t\t${JSON.parse(movie).Ratings[0].Value}`);
                if(JSON.parse(movie).Ratings[1]) {
                    console.log(`Rotten Tomatos:\t${JSON.parse(movie).Ratings[1].Value}`);
                }
                console.log(`Language: \t${JSON.parse(movie).Language}`);
                console.log(`Actors: \t${JSON.parse(movie).Actors}`);
                console.log(`Plot: \t\t--\n${JSON.parse(movie).Plot}`);
            }
        });
    },
    'do-what-it-says': function() {
        fs.readFile('random.txt', 'utf8', function(err, data) {
            if(!err) {
                let arr = data.split(',');
                let command = arr[0];
                query_value = arr[1];
                commands[command]();
            }
        });
    }
}

if(command === 'my-tweets' || command === 'spotify-this-song' || command === 'movie-this' || command === 'do-what-it-says') {
    commands[command]();
}else{
    console.log(command + ' is not a command');
}
const spotifyAPI = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
}

const omdbKey = process.env.OMDB_API_KEY;

const twitter = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessTokenKey: process.env.TWITTER_ACCESS_TOKEN_KEY,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
}

const request = require('request');
const spotify = require('node-spotiy-api');
spotify = new spotify({
    id: sptifyAPI.id,
    secret: spotifyAPI.secret
});

const commands = {
    'my-tweets': function() {

    },
    'spotify-this-song': function() {

    },
    'movie-this': function() {

    },
    'do-what-it-says': function() {

    }
}

console.log(spotify.id);
console.log(omdbKey);
console.log(twitter.consumerKey);
console.log(name);


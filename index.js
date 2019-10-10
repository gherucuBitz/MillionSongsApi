// Set up express framework
const express = require('express');
const app = express();

// Other required packages
var search = require('./searchModule');
var math = require('mathjs');


// Sett the server's filesystem
fs = require('fs' );

// Server configuration
const port = 3000
var server = app.listen(port,function() {});
console.log("Server started and listening on port " + port);

// IP of clients
var user = 'User';

// Date setup
const date = new Date();
const dateYMD = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

// Read the CSV database and converting it into a JSON Object
var musicDB;
const csvFilePath = 'music.csv';
const csv = require('csvtojson');
csv().fromFile(csvFilePath).then((jsonObj) => {
    musicDB = jsonObj;
});


// Reload the user ip address
function reloadClientIP(req)
{
    user = req.connection.remoteAddress;
    for (var i = 0; i <= user.length; i++) {
        if (!('0123456789.'.includes(user[i]))) {
              user[i] = ''
        }
    }
}


// Construct the server activity message for logging
function serverLog(path, ip)
{
    // Constructing the activity message
    msg = date + ':' + path + ' was accessed by ' + ip + '\n';

    // Save the activity in the logs
    saveLog(msg);
}


// Create the log file in the folder "logs"
function saveLog(msg)
{
    // Path for the new log fille
    var logPath = './logs/log' + dateYMD + '.txt';

    // Save the message in a buffer
    buffer = new Buffer.from(msg + '\n');

    // Server message
    console.log(msg);

    // Use the filesystem to write to log files
    fs.writeFile(logPath, buffer, function(err, fd) {
        if (err) {
            throw 'error creating log file: ' + err;
        }
    });
}


///// -------- Default route of the server that prints the documentation -GET
app.get('/',(function(req,res)
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Log the activity
    serverLog('/', user);

    // Send the html page of the documentation as a response
    // back to the client
    fs.readFile('./index.html', function (err, html) {
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write(html);
    res.end();
});
}));


///// -------- Song Search Route - GET
// Parameters: NONE
app.get('/song/search', (req,res) =>
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Send response back to the client
    res.send("Filter through songs using artist, terms, or year.");

    console.log(search.searchMusicDB({}, {}, musicDB));

    // Log the activity
    serverLog('/song/search', user);

});

// Parameters: artist
app.get('/song/search/artist=:artist', (req,res) =>
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Construct the arrays for the search
    keys = Object.keys(req.params);
    keys[0] = keys[0] + '.name';
    values = Object.values(req.params);

    // Send response back to the client
    res.send("Filter through songs using artist, terms, or year.");

    console.log(search.searchMusicDB(keys, values, musicDB));

    // Log the activity
    serverLog('/song/search', user);

});

// Parameters: terms
app.get('/song/search/genre=:terms', (req,res) =>
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Construct the arrays for the search
    keys = Object.keys(req.params);
    keys[0] = 'song.' + keys[0];
    values = Object.values(req.params);

    // Send response back to the client
    res.send("Filter through songs using artist, terms, or year.");

    console.log(search.searchMusicDB(keys, values, musicDB));

    // Log the activity
    serverLog('/song/search/genre=' + key[0], user);

});

// Parameters: year
app.get('/song/search/year=:year', (req,res) =>
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Construct the arrays for the search
    keys = Object.keys(req.params);
    keys[0] = 'song.' + keys[0];
    values = Object.values(req.params);

    // Send response back to the client
    res.send("Filter through songs using artist, terms, or year.");

    console.log(search.searchMusicDB(keys, values, musicDB));

    // Log the activity
    serverLog('/song/search/year=' + keys[0], user);

});

// Parameters: artist & terms
app.get('/song/search/artist=:artist/genre=:terms', (req,res) =>
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Construct the arrays for the search
    keys = Object.keys(req.params);
    keys[0] = keys[0] + '.name';
    keys[1] = 'artist.' + keys[1];
    values = Object.values(req.params);

    // Send response back to the client
    res.send("Filter through songs using artist, terms, or year.");

    console.log(search.searchMusicDB(keys, values, musicDB));

    // Log the activity
    serverLog('/song/search/artist=' + keys[0] + '/terms=' + keys[1], user);

});

// Parameters: artist & year
app.get('/song/search/artist=:artist/year=:year', (req,res) =>
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Construct the arrays for the search
    keys = Object.keys(req.params);
    keys[0] = keys[0] + '.name';
    keys[1] = 'song.' + keys[1];
    values = Object.values(req.params);

    // Send response back to the client
    res.send("Filter through songs using artist, terms, or year.");

    console.log(search.searchMusicDB(keys, values, musicDB));

    // Log the activity
    serverLog('/song/search/artist=' + keys[0] + '/year=' + keys[1], user);

});

// Parameters: terms & year
app.get('/song/search/genre=:terms/year=:year', (req,res) =>
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Construct the arrays for the search
    keys = Object.keys(req.params);
    keys[0] = 'artist.' + keys[0];
    keys[1] = 'song.' + keys[1];
    values = Object.values(req.params);

    // Send response back to the client
    res.send("Filter through songs using artist, terms, or year.");

    console.log(search.searchMusicDB(keys, values, musicDB));

    // Log the activity
    serverLog('/song/search/artist=' + keys[0] + '/year=' + keys[1], user);

});

// Parameters: artist & year & terms
app.get('/song/search/artist=:name/year=:year/genre=:terms', (req,res) =>
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Construct the arrays for the search
    keys = Object.keys(req.params);
    keys[0] = 'artist.' + keys[0];
    keys[1] = 'song.' + keys[1];
    keys[2] = 'artist.' + keys[2];
    values = Object.values(req.params);

    // Send response back to the client
    res.send("Filter through songs using artist, terms, or year.");

    console.log(search.searchMusicDB(keys, values, musicDB));

    // Log the activity
    serverLog('/song/search/artist=' + keys[0] + '/year=' + keys[1], user);

});


///// -------- Song Information Route - GET
app.get('/song/information/id=:id', (req,res) =>
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Construct the arrays for the search
    keys = Object.keys(req.params);
    keys[0] = 'song.' + keys[0];
    values = Object.values(req.params);

    console.log(search.searchMusicDB(keys, values, musicDB));

    // Send response back to the client
    res.send("Get all available information about a specific song" +
        "  identified by its unique dataset ID.");

    // Log the activity
    serverLog('/song/information/id=' + key[0], user);

});


///// -------- Song Popularity Route - GET
// Parameters: hotttnesss
app.get('/song/popularity/hottness=:hotttnesss', (req,res) =>
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Construct the arrays for the search
    keys = Object.keys(req.params);
    keys[0] = 'song.' + keys[0];
    values = Object.values(req.params);


    // Send response back to the client
    res.send("Get an ordering of songs in a specific year ranked " +
    "and subsetted by popularity.");

    console.log(search.searchMusicDB(keys, values, musicDB));

    // Log the activity
    serverLog('/song/popularity/hottness=' + key[0], user);

});

// Parameters: hotttnesss & top
app.get('/song/popularity/hottness=:hotttnesss/top=:top', (req,res) =>
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Construct the arrays for the search
    keys = Object.keys(req.params);
    keys[0] = 'song.' + keys[0];
    values = Object.values(req.params);


    // Send response back to the client
    res.send("Get an ordering of songs in a specific year ranked " +
    "and subsetted by popularity.");

    console.log(search.searchMusicDB(keys, values, musicDB));

    // Log the activity
    serverLog('/song/popularity/hottness=' + key[0], user);

});


///// -------- Artist Search Route - GET
// Parameters: NONE
app.get('/artist/search', (req,res) =>
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Send response back to the client
    res.send("Obtain a list of all artists in the dataset, optionally " +
    "filtered by artist name and/or genre.");

    console.log(search.searchMusicDB({}, {}, musicDB));

    // Log the activity
    serverLog('/artist/search', user);

});

// Parameters: artist
app.get('/artist/search/name=:name', (req,res) =>
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Construct the arrays for the search
    keys = Object.keys(req.params);
    keys[0] = 'artist.' + keys[0];
    values = Object.values(req.params);

    // Send response back to the client
    res.send("Obtain a list of all artists in the dataset, optionally " +
    "filtered by artist name and/or genre.");

    console.log(search.searchMusicDB(keys, values, musicDB));

    // Log the activity
    serverLog('/artist/search/name=' + keys[0], user);

});


///// -------- Artist Popularity Route - GET
app.get('/artist/popularity/hottness=:hotttnesss', (req,res) =>
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Construct the arrays for the search
    keys = Object.keys(req.params);
    keys[0] = 'artist.' + keys[0];
    values = Object.values(req.params);

    // Send response back to the client
    res.send("Obtain a list of all artists in the dataset, optionally " +
    "filtered by artist name and/or genre.");

    console.log(search.searchMusicDB(keys, values, musicDB));

    // Log the activity
    serverLog('/artist/popularity/hottness=' + key[0], user);

});


///// -------- Statistics Route - GET
// Parameters: Artist & Year
app.get('/statistics/artist=:name/?year=:year', (req,res) =>
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Construct the arrays for the search
    keys = Object.keys(req.params);
    keys[0] = 'artist.' + keys[0];
    keys[1] = 'song.' + keys[1];
    values = Object.values(req.params);

    // Construct the array of popularities for the given query
    searchResult = search.searchMusicDB(keys, values, musicDB);
    popularityArray = []
    searchResult.forEach(function(row) {
        popularityArray.push(row.song.hotttnesss);
        console.log(popularityArray);
    });

    if (popularityArray) {
        console.log("Mean: " + math.mean(popularityArray));
        console.log("Median: " + math.median(popularityArray));
        console.log("Standard Deviation: " + math.std(popularityArray));
    }

    // Send response back to the client
    res.send("Get descriptive statistics (mean, median, standard " +
              " deviation) for the popularity of the songs for a " +
              "particular artist with an optional filter by year.");

    // Log the activity
    serverLog('/statistics/artist=' + key[0] + '/year=' + key[1], user);

});

// Parameters: Artist
app.get('/statistics/artist=:name', (req,res) =>
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Construct the arrays for the search
    keys = Object.keys(req.params);
    keys[0] = 'artist.' + keys[0];
    values = Object.values(req.params);

    console.log(keys, values);

    // Construct the array of popularities for the given query
    searchResult = search.searchMusicDB(keys, values, musicDB);
    popularityArray = []
    searchResult.forEach(function(row) {
        popularityArray.push(row.song.hotttnesss);
    });

    if (popularityArray) {
        console.log("Mean: " + math.mean(popularityArray));
        console.log("Median: " + math.median(popularityArray));
        console.log("Standard Deviation: " + math.std(popularityArray));
    }

    // Send response back to the client
    res.send("Get descriptive statistics (mean, median, standard " +
              " deviation) for the popularity of the songs for a " +
              "particular artist with an optional filter by year.");

    // Log the activity
    serverLog('/statistics/artist=' + key[0],  user);

});


///// -------- Rating Route - POST
app.post('/rating', (req,res) =>
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Send response back to the client
    res.send("Create the database for rankings.");

    // Log the activity
    serverLog('/rating', user);

});


///// -------- Rating Route - PUT
app.put('/rating', (req,res) =>
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Send response back to the client
    res.send("Send the rating for a song or an artist.");

    // Log the activity
    serverLog('/rating', user);

});


///// -------- Rating Route - DELETE
app.delete('/rating', (req,res) =>
{
    // Reload the client's ip address
    reloadClientIP(req);

    // Send response back to the client
    res.send("Delete the rating for an artist or song.");

    // Log the activity
    serverLog('/rating', user);

});

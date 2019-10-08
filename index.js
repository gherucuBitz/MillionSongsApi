const express = require('express')
const app = express()
const port = 3000

var server=app.listen(3000,function() {});
console.log("Server started and listening on port 3000")



// Default route of the server that prints the documentation
app.get('/',(function(req,res){
    var http = require('http'),
    fs = require('fs');


    fs.readFile('./index.html', function (err, html) {
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write(html);
    res.end();
});
}));


// GetSongInfo Route
app.route('/getSongInfo').get(function(req,res)
{
    res.send("Get all available information about a specific song" +
        "  identified by its unique dataset ID.");
});


// GetSongsByPopularity Route
app.route('/getSongByPopularity').get(function(req,res)
{
    res.send("Get an ordering of songs in a specific year ranked " +
        "and subsetted by popularity.");
});


// GetArtistsByPopularity Route
app.route('/getArtistsByPopularity').get(function(req,res)
{
    res.send("Retrieve an ordering of the artists ranked by their " +
    "popularity (hotttness index) from more to less popular, with " +
    "the possibility to subset this order, e.g. the top 50 artists.");
});


// GetStatistics Route
app.route('/getStatistics').get(function(req,res)
{
    res.send("Get descriptive statistics (mean, median, standard " +
              " deviation) for the popularity of the songs for a " +
              "particular artist with an optional filter by year.");
});


// Search Route
app.route('/search').get(function(req,res)
{
    res.send("Retrieve the list of searches.");
}),

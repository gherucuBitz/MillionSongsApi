module.exports = {

    searchArtistTerms: function(value, musicDB) {
        var list = [];
        musicDB.forEach(function (row) {
            if (row.artist.terms == value) {
                list.push(row);
            }
        });
        return list;
    },

    searchArtistName: function(value, musicDB) {
        var list = [];
        musicDB.forEach(function (row) {
            if (row.artist.name == value) {
                list.push(row);
            }
        });
        return list;
    },

    searchSongHottness: function(value, musicDB) {
        var list = [];
        musicDB.forEach(function (row) {
            if (row.song.hotttnesss == value) {
                list.push(row);
            }
        });
        return list;
    },

    searchArtistHottness: function(value, musicDB) {
        var list = [];
        musicDB.forEach(function (row) {
            if (row.artist.hotttnesss == value) {
                list.push(row);
            }
        });
        return list;
    },

    searchSongYear: function(value, musicDB) {
        var list = [];
        musicDB.forEach(function (row) {
            if (row.song.year == value) {
                list.push(row);
            }
        });
        return list;
    },

    searchSongID: function(value, musicDB) {
        var list = [];
        musicDB.forEach(function (row) {
            if (row.song.id == value) {
                list.push(row);
            }
        });
        return list;
    },

    searchArtistID: function(value, musicDB) {
        var list = [];
        musicDB.forEach(function (row) {
            if (row.artist.id == value) {
                list.push(row);
            }
        });

        return list;
    },

    // Search script for the json Database
    searchMusicDB: function(params, values, musicDB) {
      var copyList = musicDB;
        for (var i = 0; i < params.length; i++) {

            if (params[i] == 'song.id') {
                copyList = this.searchSongID(values[i], copyList);
            }

            else if (params[i] == 'song.hotttnesss') {
                copyList = this.searchSongHottness(values[i], copyList);
            }

            else if (params[i] == 'song.year') {
                copyList = this.searchSongYear(values[i], copyList);
            }

            else if (params[i] == 'artist.hotttnesss') {
                copyList = this.searchArtistHottness(values[i], copyList);
            }

            else if (params[i] == 'artist.name') {
                copyList = this.searchArtistName(values[i], copyList);
            }

            else if (params[i] == 'artist.terms') {
                copyList = this.searchArtistTerms(values[i], copyList);
            }

            else if (params[i] == 'artist.id') {
                copyList = this.searchArtistID(values[i], copyList);
            }

            else {
              if(params)
                copyList = {};
            }

        }

        console.log(copyList);
        return copyList;
    }
}

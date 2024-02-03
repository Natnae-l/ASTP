// this function have different algorithms to get the statistics of songs

function getStat(songs){
    let artist = {};
    let genres = {};
    
    songs.forEach(data => {
        if(!(data.Artist in artist)){
            artist[data.Artist] = {
                song: 1,
                albums: {
                    album: data.Album,
                    count: 1,
                    data: [data.Album]
                }
            }
        } else if(data.Artist in artist) {
            artist[data.Artist].song++
            if (artist[data.Artist].albums.data.indexOf(data.Album) == -1){
                artist[data.Artist].albums.data.push(data.Album)
                artist[data.Artist].albums.count++
            }
        }

        if (!(data.Genre in genres)){
            genres[data.Genre] = {
                song: 1
            }
        } else {
            genres[data.Genre].song++
        }
    })


    
            // total number of songs, 
            let totalNumOfSong = songs.length;

        // number of songs and albums each artist has

        let numOfSongAndAlbumArtist = [];
          for (let key in artist){
            numOfSongAndAlbumArtist.push({
                artist: key,
                song: artist[key].song,
                album: artist[key].albums.count
            })
          }


         // number of songs in every genre
         let numOfSongInEveryGenre = [];
         for (let key in genres){
            numOfSongInEveryGenre.push({
                key: genres[key.song]
            })
         }

        // total number of artists
        let totalNumOfArtist = Object.keys(artist).length


        // total number of albums

        let numOfAlbums = 0
        for (let key in artist){
            numOfAlbums += artist[key].albums.count
        }   

      // total genres
      let totalGenres = Object.keys(genres).length
    
    // number of songs in each album 
    let numOfSongInAlbum = [];
    for (let key in artist){
        numOfSongInAlbum.push({
            [artist[key].albums.album]: artist[key].albums.count
        })
    }

    return artist
}


export default getStat
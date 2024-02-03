// statistics class to get a statistics of songs

class Statistics {
    static mainData = {}  // to store the statistics of songs

    static artist = {} // store an updated form of songs data to manipulate according to the artist
    static genres = {} // store anupdated form songs data according to genre

    // assemble the song data to a reusable artist and genre objects
    static setArtistAndGenre(songs){
         songs.forEach(data => {
            if(!(data.Artist in this.artist)){
                this.artist[data.Artist] = {
                    song: 1,
                    albums: {
                        album: data.Album,
                        count: 1,
                        data: [data.Album]
                    }
                }
            } else if(data.Artist in this.artist) {
                this.artist[data.Artist].song++
                if (this.artist[data.Artist].albums.data.indexOf(data.Album) == -1){
                    this.artist[data.Artist].albums.data.push(data.Album)
                    this.artist[data.Artist].albums.count++
                }
            }
    
            if (!(data.Genre in this.genres)){
                this.genres[data.Genre] = {
                    song: 1
                }
            } else {
                this.genres[data.Genre].song++
            }
        })

        this.TotalNumberOfsongs(songs)
    }

    // get total number of songs and put it into mainData object
    static TotalNumberOfsongs(songs){
        this.mainData.totalNumberOfSong = songs.length;

        this.numberOfSongAndAlbumInArtist()
    }

    // get total number Of Song And Albums an Artist has and put it into mainData object
    static numberOfSongAndAlbumInArtist(){

        let numOfSongAndAlbumArtist = [];
          for (let key in this.artist){
            numOfSongAndAlbumArtist.push({
                artist: key,
                song: this.artist[key].song,
                album: this.artist[key].albums.count
            })
          }
          this.mainData.numberOfSongAndAlbumInArtist = numOfSongAndAlbumArtist

          this.NumOfSongInEveryGenre()
    }

    // get total number of songs in a particular genre and add it into mainData Object
    static NumOfSongInEveryGenre(){
        let numOfSongInEveryGenre = [];
         for (let key in this.genres){
            numOfSongInEveryGenre.push({
                [key]: this.genres[key].song

            })
         }
        this.mainData.numberOfSongInEveryGenre = numOfSongInEveryGenre

        this.TotalNumberOfArtist()
    }

    // get total number of artist and add the value to mainData
    static TotalNumberOfArtist(){
        this.mainData.totalNumberOfArtist = Object.keys(this.artist).length

        this.numberOfAlbums()
    }
    
    // get total number of albums and add the value to mainData
    static numberOfAlbums(){
        let numOfAlbums = 0
        for (let key in this.artist){
            numOfAlbums += this.artist[key].albums.count
        }   
        this.mainData.numOfAlbums = numOfAlbums

        this.totalGenres()
    }

    // get total number of genres and add the value to mainData
    static totalGenres(){
        let numOfSongInAlbum = [];
        for (let key in this.artist){
            numOfSongInAlbum.push({
                [this.artist[key].albums.album]: this.artist[key].albums.count
            })
        }
        this.mainData.numOfSongInAlbum = numOfSongInAlbum;
    }

}

export default Statistics
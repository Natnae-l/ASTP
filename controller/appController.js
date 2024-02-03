import Song from '../module/Song.js'
import {validationResult, matchedData} from 'express-validator'

let getSong = async (req, res, next) => {
    try {
        let songs = await Song.find();
        res.json(songs)
    } catch (err) {
        next(err)
    }
}
let uploadSong = async (req, res, next) => {

    const result = validationResult(req);
    const errors = result.array();
    let data = matchedData(req);

    if (errors.length > 0){
        let messages = errors.map(data => {
            return {
                [data.path]: data.msg
            }
        })
        return res.json(messages)
    } else if(Object.keys(data).length < 4){
        return res.json(['Please enter valid information'])
    }
    
    try {
        data = new Song(data);
        let response = await data.save();
        
        if(response){
            return res.json(['Song added successfully'])
        }
    } catch (err) {
        next(err)
    }   
}
let updateSong = async (req, res, next) => {
    const result = validationResult(req);
    const errors = result.array();
    let data = matchedData(req);

    if (errors.length > 0){
        let messages = errors.map(data => {
            return {
                [data.path]: data.msg
            }
        })
        return res.json(messages)
    } else if(Object.keys(data).length < 4){
        return res.json(['Please enter valid information'])
    }

    try {
        const id = req.query.id;
        
        if (id){
            let response = await Song.findByIdAndUpdate({_id: id}, data);
            if (response){
                return res.json({
                      message: ['Song updated successfully'], response
                   })
            }
        }
        
    } catch (err) {
        next(err)
    }
    
}
let deleteSong = async (req, res, next) => {
    try {
        const id = req.query.id;
        
        if (id){
            let response = await Song.findByIdAndDelete({_id: id})
            if (response){
                return res.json( ['Song Deleted successfully'])
            }
        }
        
    } catch (err) {
        next(err)
    }
}

// get statistics
let getStatistics = async (req, res, next) => {
    let songs;
    try {
        songs = await Song.find();
        // console.log(songs)
        // res.json(songs)

    } catch (err) {
        next(err)
    }

    // total number of songs, 
         console.log(songs.length)
    // total genres
        
        
    // number of songs and albums each artist has
        let artist = {};
        
        songs.forEach(data => {
            if(!(data.Artist in artist)){
                artist[data.Artist] = {
                    song: 1,
                    albums: {
                        count: 1,
                        data: [data.Album]
                    }
                }
            } else {
                artist[data.Artist].song++
                if (artist[data.Artist].albums.data.indexOf(data.Album) == -1){
                    artist[data.Artist].albums.data.push(data.Album)
                    artist[data.Artist].albums.count++
                }
            }
        })
        // total number of artists
        console.log(Object.keys(artist).length);

        // total number of albums

        // {
        //     "&lt;a&gt;#@#@#&lt;&#x2F;a&gt;": {
        //         "song": 3,
        //         "albums": {
        //             "count": 1,
        //             "data": [
        //                 "eferfrf"
        //             ]
        //         }
        //     }
        // }
        let numOfAlbums = 0
        for (let key in artist){
            numOfAlbums += artist[key].albums.count
        }
        console.log(numOfAlbums);

        res.json(artist);

     

    // number of songs in every genre
    
    // number of songs in each album 


}


export {getSong, uploadSong, updateSong, deleteSong, getStatistics};
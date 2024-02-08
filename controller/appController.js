import Song from '../module/Song.js'
import {validationResult, matchedData} from 'express-validator'
import Statistics from '../classes/statistics.js'

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
            console.log(data);
            console.log(req.body);
            let response = await Song.findByIdAndUpdate({_id: id}, data);
            if (response){
                return res.json({
                      message: ['Song updated successfully'], response
                   })
            }
            else {
                return res.send({r: response, s: id})
            }
        }
        return res.send(id)
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

        Statistics.setArtistAndGenre(songs)
        res.json(Statistics.mainData);

    } catch (err) {
        next(err)
    } 
}


export {getSong, uploadSong, updateSong, deleteSong, getStatistics};
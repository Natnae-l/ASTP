import Song from '../module/Song.js'

let getSong = async (req, res, next) => {

}
let uploadSong = async (req, res, next) => {
    let songData = req.body;
    console.log(songData);
}
let updateSong = async (req, res, next) => {
    
}
let deleteSong = async (req, res, next) => {
    
}


export {getSong, uploadSong, updateSong, deleteSong};
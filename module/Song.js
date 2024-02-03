import mongoose from "mongoose"

const Schema = mongoose.Schema;

let songSchema = new Schema({
    Title: {type: String, required: true},
    Artist: {type: String, required: true},
    Album: {type: String, required: true},
    Genre: {type: String, required: true}
})

let SongModel = mongoose.model('song', songSchema)

export default SongModel;
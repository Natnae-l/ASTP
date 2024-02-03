import express from 'express'
import * as appController from '../controller/appController.js'

// construct router instance
const router = express.Router();

router.get('/songs', appController.getSong)      // get every song
router.post('/song', appController.uploadSong)   // add a song 
router.patch('/song', appController.updateSong)  // update song
router.delete('/song', appController.deleteSong) // delete song

export default router
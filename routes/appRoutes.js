import express from 'express'
import * as appController from '../controller/appController.js'
import * as validator from '../controller/validator.js';

// construct router instance
const router = express.Router();

//CRUD
router.get('/song', appController.getSong)  // get every song
router.post('/song', validator.validateBody(), appController.uploadSong)   // add a song 
router.put('/song', validator.validateBody(), appController.updateSong)    // update song
router.delete('/song', appController.deleteSong)    // delete song

// get statistics
router.get('/statistics', appController.getStatistics)


export default router
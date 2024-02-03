import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import appRoutes from './routes/appRoutes.js' // application routes

// include dotenv file
dotenv.config()

// construct express instance
const app = express();

// connect database
mongoose.connect(process.env.MongoDB)
        .then(data => {
            app.listen(process.env.PORT, () => console.log(`app listening on ${process.env.PORT}`))
        })
        .catch(err => console.log(err.message))



// use cors middleware
// const corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 
//   }
app.use(cors())

// routes
app.use(appRoutes)




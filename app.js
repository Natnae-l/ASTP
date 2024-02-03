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



// use cors middleware to give access to the frontend Origin
// const corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 
//   }
app.use(cors())

//middlewares
app.use(express.urlencoded({extended: false}))

// routes
app.use(appRoutes)




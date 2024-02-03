import { body} from 'express-validator'

let validateBody = () => {
    return [
                body('Title').notEmpty().isString().trim().escape(), 
                body('Artist').notEmpty().isString().trim().escape(),
                body('Album').notEmpty().isString().trim().escape(),
                body('Genre').notEmpty().isString().trim().escape()
           ]    
}

 

export {validateBody}
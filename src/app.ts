import express, { Application, Request, Response, urlencoded } from 'express'
import cors from 'cors';


const app: Application = express()
const port = 5000


//use MidleWare
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Testing Route..Will remove leter
app.get('/', (req: Request, res: Response) => {
    res.send(' Working SuccessFully')
})

export default app;
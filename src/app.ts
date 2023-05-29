import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()

//use MidleWare
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Testing Route..Will remove leter
app.get('/', (req: Request, res: Response) => {
  res.send(' Working SuccessFully')
})

export default app

import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/users.route'

const app: Application = express()

//use MidleWare
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Routes
app.use('/api/v1/users', userRouter)

// Testing Route..Will remove leter
app.get('/', (req: Request, res: Response) => {
  res.send(' Working SuccessFully')
})

export default app

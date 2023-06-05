import express, { Application } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/users/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()

//use MidleWare
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Routes
app.use('/api/v1/users', UserRoutes)

// //Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new ApiError(400, 'Ore Baba Error ')
//   // next('Ore Baba Error') // Error
// })

// global error handler
app.use(globalErrorHandler)

export default app

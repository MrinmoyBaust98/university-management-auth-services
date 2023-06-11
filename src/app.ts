import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routers from './app/routes';

const app: Application = express();

//use MidleWare
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use('/api/v1', routers);
// app.use('/api/v1/users', UserRoutes);
// app.use('/api/v1/academic-semister', AcademicSemisterRoutes);

// //Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new ApiError(400, 'Ore Baba Error ')
//   // next('Ore Baba Error') // Error
// })

// global error handler
app.use(globalErrorHandler);

export default app;

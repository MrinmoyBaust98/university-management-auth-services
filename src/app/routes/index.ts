import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { AcademicSemisterRoutes } from '../modules/academicSemister/academicSemister.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semister',
    route: AcademicSemisterRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;

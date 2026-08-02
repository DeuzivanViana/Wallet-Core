import Elysia from 'elysia';
import { UserController } from '../controllers/user.controller';

export const userRoutes = new Elysia({ prefix: '/user' })
  .get('/', UserController.getCurrentUser)

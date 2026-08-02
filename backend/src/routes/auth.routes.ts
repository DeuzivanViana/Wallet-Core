import Elysia from 'elysia';
import { AuthController } from '../controllers/auth.controller';
import z from 'zod';

export const authRoutes = new Elysia({ prefix: '/auth'})
  .post('/sign-up', AuthController.signUp, {
    body: z.object({
      username: z.string().max(256).min(2),
      displayName: z.string().max(128).min(4),
      password: z.string().max(72).min(8)
    })
  })
  .post('/sign-in', AuthController.signIn, {
    body: z.object({
      username: z.string().max(256).min(2),
      password: z.string().max(72).min(8)
    })
  })

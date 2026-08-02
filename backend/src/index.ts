import { Elysia } from 'elysia'

import cors from '@elysia/cors'
import { jwt } from '@elysia/jwt'

import { userRoutes } from './routes/user.routes';
import { authRoutes } from './routes/auth.routes';
import { walletRoutes } from './routes/wallet.routes';

const app = new Elysia({prefix: '/api/v1'})
  .use(cors())
  .use(jwt({
    name: 'jwt',
    secret: 'dont-use-in-production'
  }))
  .use(userRoutes)
  .use(authRoutes)
  .use(walletRoutes)
  .listen({
    hostname: '0.0.0.0',
    port: 3001
  });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

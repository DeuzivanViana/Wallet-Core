import Elysia from 'elysia';
import { WalletController } from '../controllers/wallet.controller';

export const walletRoutes = new Elysia({ prefix: '/wallet' })
  .get('/', WalletController.getCurrentWallet)
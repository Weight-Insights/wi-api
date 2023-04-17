import { router as usersRouter } from './user/router.js';
import { router as gamesRouter } from './game/router.js';
import { router as membersRouter } from './member/router.js';
import { router as weightsRouter } from './weight/router.js';
import { router as paymentsRouter } from './payment/router.js';
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', usersRouter);
app.use('/api/v1/game', gamesRouter);
app.use('/api/v1/member', membersRouter);
app.use('/api/v1/weight', weightsRouter);
app.use('/api/v1/payment', paymentsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';

import { NotFoundHandler } from '@shared/infra/http/middlewares/NotFoundHandler';
import { ExceptionHandler } from '@shared/infra/http/middlewares/ExceptionHandler';
import { router } from './routes';

const app = express();

app.use(cors({ maxAge: 86400 }));

// Helmet helps to secure express apps by setting various HTTP headers
app.use(helmet());

// Make server recognize the requests as JSON objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(NotFoundHandler);

app.use(ExceptionHandler);

export { app };

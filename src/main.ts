import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

import 'express-async-errors';

import '@shared/container';
import '@shared/providers/firebase';
import '@shared/infra/http/passport';
import { AppRateLimit } from '@shared/infra/http/middlewares/AppRateLimit';
import { NotFoundHandler } from '@shared/infra/http/middlewares/NotFoundHandler';
import { ExceptionHandler } from '@shared/infra/http/middlewares/ExpectionHandler';
import { router } from '@shared/infra/http/routes';

const app = express();

app.use(cors({ maxAge: 86400 }));

// Helmet helps to secure express apps by setting various HTTP headers
app.use(helmet());

// Limit requests by IP
app.set('trust proxy', 1);
app.use(AppRateLimit);

// Make server recognize the requests as JSON objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the pictures
app.use(
  '/images',
  express.static(path.resolve(__dirname, '..', 'uploads', 'images'))
);

// Routes
app.use(router);

// 404 handler
app.use(NotFoundHandler);

// Express exception handler
app.use(ExceptionHandler);

export default app;

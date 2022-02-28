import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import firebase from 'firebase-admin';

import { AppRateLimit } from '@middlewares/AppRateLimit';
import { NotFoundHandler } from '@middlewares/NotFoundHandler';
import { ExceptionHandler } from '@middlewares/ExpectionHandler';
import firebaseServiceAccount from '@config/serviceAccountKey.json';

const app = express();

firebase.initializeApp({
  credential: firebase.credential.cert(firebaseServiceAccount as any),
});

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
  express.static(path.resolve(__dirname, 'uploads', 'images'))
);

// 404 handler
app.use(NotFoundHandler);

// Express exception handler
app.use(ExceptionHandler);

export default app;

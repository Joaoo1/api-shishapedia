import type { ErrorRequestHandler } from 'express';

const ExceptionHandler: ErrorRequestHandler = (err, req, res, next) => {
  return res.status(err.status ?? 500).json({ error: err.message });
};

export { ExceptionHandler };

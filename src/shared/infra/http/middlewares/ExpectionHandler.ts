import { ErrorRequestHandler, Response } from 'express';
import * as Yup from 'yup';

type ValidatorErrors = {
  [key: string]: string;
};

const formatValidationResponse = (
  err: Yup.ValidationError,
  response: Response
) => {
  const errors: ValidatorErrors = {};

  err.inner.forEach(error => {
    if (error.path) {
      errors[error.path] = error.message;
    }
  });

  return response.status(400).json({
    errors,
    error: 'Validação dos dados falhou',
  });
};

const ExceptionHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Yup.ValidationError) {
    return formatValidationResponse(err, res);
  }

  return res.status(err.status || 500).json({ error: err.message });
};

export { ExceptionHandler };

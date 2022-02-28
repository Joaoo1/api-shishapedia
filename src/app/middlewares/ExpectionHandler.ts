import { ErrorRequestHandler } from 'express';
import * as Yup from 'yup';

import { createValidatonErrorsObject } from '../helpers/yup';

const ExceptionHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Yup.ValidationError) {
    const errors = createValidatonErrorsObject(err);

    return res.status(400).json({
      errors,
      error: 'Validação dos dados falhou',
    });
  }

  return res.status(err.status || 500).json({ error: err.message });
};

export { ExceptionHandler };

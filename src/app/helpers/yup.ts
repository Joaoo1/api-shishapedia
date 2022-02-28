import * as Yup from 'yup';

type ValidatorErrors = {
  [key: string]: string;
};

const createValidatonErrorsObject = (err: Yup.ValidationError) => {
  const validationErrors: ValidatorErrors = {};

  err.inner.forEach(error => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });

  return validationErrors;
};

export { createValidatonErrorsObject };

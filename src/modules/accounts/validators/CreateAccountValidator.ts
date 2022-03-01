import { emailRegex } from '../../common/validation/emailRegex';
import { yupOptions } from '../../common/validation/yupOptions';
import yup from '../../common/validation/yup';

const createAccountSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().matches(emailRegex, 'Email inválido').required(),
  password: yup.string().required(),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'As senhas não conferem'),
});

const createAccountValidator = (data: object) =>
  createAccountSchema.validate(data, yupOptions);

export { createAccountValidator };

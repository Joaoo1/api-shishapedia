import { emailRegex } from '../../common/validation/emailRegex';
import { yupOptions } from '../../common/validation/yupOptions';
import yup from '../../common/validation/yup';

const createUserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().matches(emailRegex, 'Email inválido').required(),
  password: yup.string().required(),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'As senhas não conferem'),
});

const createUserValidator = (data: object) =>
  createUserSchema.validate(data, yupOptions);

export { createUserValidator };

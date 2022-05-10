import yup from '../../common/validation/yup';
import { emailRegex } from '../../common/validation/emailRegex';
import { passwordRegex } from '../../common/validation/passwordRegex';
import { yupOptions } from '../../common/validation/yupOptions';

const updateUserSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().matches(emailRegex, 'Email inválido'),
  currentPassword: yup.string(),
  password: yup
    .string()
    .matches(
      passwordRegex,
      'Senha precisa conter letras maiúsculas, minúsculas, números, e no minímo 8 digítos'
    )
    .when('oldPassword', (currentPassword, field) =>
      currentPassword ? field.required('Insira uma senha') : field
    ),
  passwordConfirmation: yup
    .string()
    .when('password', (password, field) =>
      password
        ? field
            .required('Insira a confirmação da senha')
            .oneOf([yup.ref('password')], 'As senhas não conferem')
        : field
    ),
});

const updateUserValidator = (data: object) =>
  updateUserSchema.validate(data, yupOptions);

export { updateUserValidator };

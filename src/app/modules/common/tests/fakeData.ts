// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import { passwordRegex } from '../validation/passwordRegex';

const generateFakeName = () => faker.name.findName();

const generateFakeEmail = () => faker.internet.email();

const generateFakeValidPassword = () =>
  faker.internet.password(24, true, passwordRegex);

export { generateFakeEmail, generateFakeName, generateFakeValidPassword };

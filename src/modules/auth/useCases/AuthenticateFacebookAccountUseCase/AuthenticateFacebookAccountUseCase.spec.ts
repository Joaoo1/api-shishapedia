import 'reflect-metadata';
import { JsonWebTokenError, verify } from 'jsonwebtoken';

import {
  generateFakeEmail,
  generateFakeName,
  generateRandomAplhanumeric,
} from '@modules/common/tests/fakeData';
import { UsersRepositoryInMemory } from '@modules/users/repositories/implementations/UsersRepositoryInMemory';
import authConfig from '@config/auth';
import { AuthenticateFacebookAccountUseCase } from './AuthenticateFacebookAccountUseCase';

let authenticateFacebookAccountUseCase: AuthenticateFacebookAccountUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('AuthenticateFacebookUseCase', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateFacebookAccountUseCase = new AuthenticateFacebookAccountUseCase(
      usersRepositoryInMemory
    );
  });

  it('should be able to authenticate with facebook account when user already exists', async () => {
    const user = await usersRepositoryInMemory.create({
      email: generateFakeEmail(),
      name: generateFakeName(),
      password: '123456',
      facebookId: 'facebookIDTest',
    });

    const response = await authenticateFacebookAccountUseCase.execute({
      email: user.email,
      name: user.name,
      facebookId: 'facebookIDTest',
    });

    expect(response).toHaveProperty('accessToken');
  });

  it('should be able to authenticate and create user with facebook account', async () => {
    const facebookId = generateRandomAplhanumeric();

    const response = await authenticateFacebookAccountUseCase.execute({
      email: generateFakeEmail(),
      name: generateFakeName(),
      facebookId,
    });

    expect(response).toHaveProperty('accessToken');

    expect(() => {
      verify(response.accessToken, authConfig.jwtSecret);
    }).not.toThrow(JsonWebTokenError);

    const user = await usersRepositoryInMemory.findByFacebookId(facebookId);

    expect(user).not.toBeNull();
  });
});

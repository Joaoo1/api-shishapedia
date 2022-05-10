import 'reflect-metadata';
import { JsonWebTokenError, verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import {
  generateFakeEmail,
  generateFakeName,
  generateRandomAplhanumeric,
} from '@modules/common/tests/fakeData';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/implementations/UsersRepositoryInMemory';
import { AuthenticateGoogleAccountUseCase } from './AuthenticateGoogleAccountUseCase';

let authenticateGoogleAccountUseCase: AuthenticateGoogleAccountUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('AuthenticateGoogleAccountUseCase', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateGoogleAccountUseCase = new AuthenticateGoogleAccountUseCase(
      usersRepositoryInMemory
    );
  });

  it('should be able to authenticate with google account when user already exists', async () => {
    const user = await usersRepositoryInMemory.create({
      email: generateFakeEmail(),
      name: generateFakeName(),
      password: '123456',
      googleId: 'googleID123',
    });

    const response = await authenticateGoogleAccountUseCase.execute({
      email: user.email,
      googleId: 'googleID123',
      name: user.name,
    });

    expect(response).toHaveProperty('accessToken');
  });

  it('should be able to authenticate and create user with google account', async () => {
    const googleId = generateRandomAplhanumeric();

    const response = await authenticateGoogleAccountUseCase.execute({
      email: generateFakeEmail(),
      name: generateFakeName(),
      googleId,
    });

    expect(response).toHaveProperty('accessToken');

    expect(() => {
      verify(response.accessToken, authConfig.jwtSecret);
    }).not.toThrow(JsonWebTokenError);

    const user = await usersRepositoryInMemory.findByGoogleId(googleId);

    expect(user).not.toBeNull();
  });

  it('should vinculated google account if account already exists', async () => {
    const userEmail = generateFakeEmail();
    const userWithEmail = await usersRepositoryInMemory.create({
      name: generateFakeName(),
      email: userEmail,
      password: generateRandomAplhanumeric(),
    });

    const googleId = generateRandomAplhanumeric();

    await authenticateGoogleAccountUseCase.execute({
      email: userEmail,
      googleId,
      name: userWithEmail.name,
    });

    const user = await usersRepositoryInMemory.findByGoogleId(googleId);

    expect(user).not.toBeNull();
    expect(user!.email).toBe(userEmail);
  });
});

import 'reflect-metadata';
import { verify, JsonWebTokenError } from 'jsonwebtoken';
import { hashSync } from 'bcryptjs';

import authConfig from '@config/auth';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/implementations/UsersRepositoryInMemory';
import {
  generateFakeEmail,
  generateFakeName,
} from '@modules/common/tests/fakeData';
import { UnauthorizedException } from '@shared/errors/UnauthorizedException';
import { AuthenticateEmailAccountUseCase } from './AuthenticateEmailAccountUseCase';

let authenticateEmailAccountUseCase: AuthenticateEmailAccountUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('AuthenticateEmailAccountUseCase', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateEmailAccountUseCase = new AuthenticateEmailAccountUseCase(
      usersRepositoryInMemory
    );
  });

  it('should be able to authenticate with email', async () => {
    const userData = {
      name: generateFakeName(),
      email: generateFakeEmail(),
      password: hashSync('Test12345', 4),
    };

    const user = await usersRepositoryInMemory.create(userData);

    const response = await authenticateEmailAccountUseCase.execute({
      email: user.email,
      password: 'Test12345',
    });

    expect(response).toHaveProperty('accessToken');

    expect(() => {
      verify(response.accessToken, authConfig.jwtSecret);
    }).not.toThrow(JsonWebTokenError);
  });

  it('should not be able to authenticate with invalid credentials', async () => {
    expect.assertions(1);

    try {
      await authenticateEmailAccountUseCase.execute({
        email: 'test@mail.com',
        password: 'Test12345@',
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(UnauthorizedException);
    }
  });

  it('should be able a generic message when invalid credentials', async () => {
    expect.assertions(2);

    try {
      await authenticateEmailAccountUseCase.execute({
        email: 'test1@mail.com',
        password: 'Test12345@',
      });
    } catch (err: any) {
      expect(err.message).toMatch(/(Usuário|usuário)/i);
      expect(err.message).toMatch(/(Senha|senha)/i);
    }
  });
});

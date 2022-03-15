import 'reflect-metadata';
import { compare } from 'bcryptjs';

import { ConflictException } from '@shared/errors/ConflictException';
import { UsersRepositoryInMemory } from '../../repositories/implementations/UsersRepositoryInMemory';
import { CreateUserUseCase } from './CreateUserUseCase';
import {
  generateFakeEmail,
  generateFakeName,
  generateFakeValidPassword,
} from '../../../common/tests/fakeData';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be to create an user', async () => {
    const data = {
      name: generateFakeName(),
      email: generateFakeEmail(),
      password: generateFakeValidPassword(),
    };

    const createdUser = await createUserUseCase.execute(data);

    const found = await userRepositoryInMemory.findById(createdUser.id);

    expect(found).toBeDefined();
    expect(found?.name).toBe(data.name);
    expect(found?.email).toBe(data.email);

    const isPasswordValid = await compare(data.password, found!.password);
    expect(isPasswordValid).toBe(true);
  });

  it('should not be able to create an user with existent email', async () => {
    expect.assertions(1);

    const email = generateFakeEmail();

    const data = {
      name: generateFakeName(),
      email,
      password: generateFakeValidPassword(),
    };

    await userRepositoryInMemory.create(data);

    const newUser = {
      name: generateFakeName(),
      email,
      password: generateFakeValidPassword(),
    };

    const createUserPromise = createUserUseCase.execute(newUser);

    return expect(createUserPromise).rejects.toBeInstanceOf(ConflictException);
  });
});

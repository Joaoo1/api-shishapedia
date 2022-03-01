import 'reflect-metadata';
import { compare } from 'bcryptjs';

import {
  generateFakeEmail,
  generateFakeName,
  generateFakeValidPassword,
} from '../../../common/tests/fakeData';
import { UsersRepositoryInMemory } from '../../repositories/implementations/UsersRepositoryInMemory';
import { CreateAccountService } from './CreateAccountService';

let createAccountService: CreateAccountService;
let userRepositoryInMemory: UsersRepositoryInMemory;

describe('CreateAccountService', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    createAccountService = new CreateAccountService(userRepositoryInMemory);
  });

  it('should be to create an account', async () => {
    const data = {
      name: generateFakeName(),
      email: generateFakeEmail(),
      password: generateFakeValidPassword(),
    };

    const createdUser = await createAccountService.execute(data);

    const found = await userRepositoryInMemory.findById(createdUser.id);

    expect(found).toBeDefined();
    expect(found?.name).toBe(data.name);
    expect(found?.email).toBe(data.email);

    const isPasswordValid = await compare(data.password, found!.password);
    expect(isPasswordValid).toBe(true);
  });
});

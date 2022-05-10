import 'reflect-metadata';
import { compare, genSaltSync, hash } from 'bcryptjs';

import {
  generateFakeEmail,
  generateFakeName,
  generateRandomAplhanumeric,
} from '@modules/common/tests/fakeData';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/implementations/UsersRepositoryInMemory';
import { UnauthorizedException } from '@shared/errors/UnauthorizedException';
import { ConflictException } from '@shared/errors/ConflictException';
import { NotFoundException } from '@shared/errors/NotFoundException';
import { UpdateUserUseCase } from './UpdateUserUseCase';

let updateUserUseCase: UpdateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;

describe('UpdateUserUseCase', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    updateUserUseCase = new UpdateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to update user', async () => {
    const user = await userRepositoryInMemory.create({
      name: generateFakeName(),
      email: generateFakeEmail(),
      password: generateRandomAplhanumeric(),
    });

    const updatedEmail = generateFakeEmail();
    const updatedUser = await updateUserUseCase.execute({
      userId: user.id,
      email: updatedEmail,
    });

    expect(updatedUser.email).toBe(updatedEmail);
  });

  it('should be able to update password', async () => {
    const currentPassword = generateRandomAplhanumeric();
    const hashedPassword = await hash(currentPassword, genSaltSync(1));
    const createdUser = await userRepositoryInMemory.create({
      name: generateFakeName(),
      email: generateFakeEmail(),
      password: hashedPassword,
    });

    const newPassword = generateRandomAplhanumeric();

    await updateUserUseCase.execute({
      userId: createdUser.id,
      currentPassword,
      password: newPassword,
    });

    const user = await userRepositoryInMemory.findById(createdUser.id);

    const isValidPassword = await compare(newPassword, user!.password);

    expect(isValidPassword).toBe(true);
  });

  it('should not be able to update an unexistent user', async () => {
    expect.assertions(1);

    try {
      await updateUserUseCase.execute({
        userId: 99999,
        name: generateFakeName(),
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('should not be able to update password with incorret current password', async () => {
    expect.assertions(2);

    const currentPassword = generateRandomAplhanumeric();
    const hashedPassword = await hash(currentPassword, genSaltSync(1));
    const createdUser = await userRepositoryInMemory.create({
      name: generateFakeName(),
      email: generateFakeEmail(),
      password: hashedPassword,
    });

    const newPassword = generateRandomAplhanumeric();

    try {
      await updateUserUseCase.execute({
        userId: createdUser.id,
        currentPassword: 'Test@123',
        password: newPassword,
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(UnauthorizedException);
    }

    const user = await userRepositoryInMemory.findById(createdUser.id);

    const isValidPassword = await compare(newPassword, user!.password);

    expect(isValidPassword).toBe(false);
  });

  it('should not be able to update password without current password', async () => {
    expect.assertions(2);

    const currentPassword = generateRandomAplhanumeric();
    const hashedPassword = await hash(currentPassword, genSaltSync(1));
    const createdUser = await userRepositoryInMemory.create({
      name: generateFakeName(),
      email: generateFakeEmail(),
      password: hashedPassword,
    });

    try {
      await updateUserUseCase.execute({
        userId: createdUser.id,
        currentPassword: 'Test@123',
        password: generateRandomAplhanumeric(),
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(UnauthorizedException);
    }

    const user = await userRepositoryInMemory.findById(createdUser.id);

    const isValidPassword = await compare(currentPassword, user!.password);

    expect(isValidPassword).toBe(true);
  });

  it('should not be able to update to an email that is already in use', async () => {
    expect.assertions(2);

    const emailInUse = generateFakeEmail();
    await userRepositoryInMemory.create({
      name: generateFakeName(),
      email: emailInUse,
      password: generateRandomAplhanumeric(),
    });

    const userEmail = generateFakeEmail();
    const user = await userRepositoryInMemory.create({
      name: generateFakeName(),
      email: userEmail,
      password: generateRandomAplhanumeric(),
    });

    try {
      await updateUserUseCase.execute({
        userId: user.id,
        email: emailInUse,
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ConflictException);
    }

    const user1 = await userRepositoryInMemory.findById(user.id);

    expect(user1!.email).toBe(userEmail);
  });
});

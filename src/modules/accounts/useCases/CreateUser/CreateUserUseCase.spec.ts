import { compare } from 'bcryptjs';
import { User } from '@modules/accounts/entities/User';
import { FakeUsersRepository } from '@modules/accounts/repositories/fake/FakeUsersRepository';
import { BadRequestError } from '@shared/infra/http/errors/BadRequestError';
import { ConflictError } from '@shared/infra/http/errors/ConflictError';
import { CreateUserUseCase } from './CreateUserUseCase';

interface SutTypes {
  sut: CreateUserUseCase;
  fakeUsersRepository: FakeUsersRepository;
}

const makeSut = (): SutTypes => {
  const fakeUsersRepository = new FakeUsersRepository();
  const sut = new CreateUserUseCase(fakeUsersRepository);

  return {
    sut,
    fakeUsersRepository,
  };
};

describe('Users module', () => {
  it('should not be able to sign up with an email that already exists', async () => {
    const { sut, fakeUsersRepository } = makeSut();
    const user = {
      email: 'test@email.com',
      password: 'Test@1234',
      name: 'Sign up test',
    };
    await fakeUsersRepository.create(user);
    const promise = sut.execute(user);
    await expect(promise).rejects.toBeInstanceOf(ConflictError);
  });

  it('should not be able to sign up with a weak password', async () => {
    const { sut } = makeSut();
    const user = {
      email: 'test@email.com',
      password: '123456',
      name: 'Sign up test',
    };
    const promise = sut.execute(user);
    await expect(promise).rejects.toBeInstanceOf(BadRequestError);
  });

  it('should be able to sign up', async () => {
    const { sut } = makeSut();
    const userData = {
      email: 'test-signup@email.com',
      password: 'Test12345',
      name: 'Sign up test',
    };
    const user = await sut.execute(userData);

    expect(user).toBeInstanceOf(User);
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
  });

  it('should hash the user password', async () => {
    const { sut } = makeSut();
    const userData = {
      email: 'test-signup@email.com',
      password: 'Test12345',
      name: 'Sign up test',
    };
    const user = await sut.execute(userData);
    const isHashedPassword = await compare(userData.password, user.password);
    expect(isHashedPassword).toBe(true);
  });
});

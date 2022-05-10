import 'reflect-metadata';
import {
  generateFakeEmail,
  generateFakeFile,
  generateFakeName,
  generateRandomAplhanumeric,
} from '@modules/common/tests/fakeData';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/implementations/UsersRepositoryInMemory';
import { NotFoundException } from '@shared/errors/NotFoundException';
import { UserImagesRepositoryInMemory } from '@modules/accounts/repositories/implementations/UserImagesRepositoryInMemory';
import { UpdateUserImageUseCase } from './UpdateUserImageUseCase';

let updateUserImageUseCase: UpdateUserImageUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let userImagesRepositoryInMemory: UserImagesRepositoryInMemory;

describe('UpdateUserImageUseCase', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    userImagesRepositoryInMemory = new UserImagesRepositoryInMemory();
    updateUserImageUseCase = new UpdateUserImageUseCase(
      userRepositoryInMemory,
      userImagesRepositoryInMemory
    );
  });

  it('should be able to update the user image and thumb', async () => {
    const user = await userRepositoryInMemory.create({
      name: generateFakeName(),
      email: generateFakeEmail(),
      password: generateRandomAplhanumeric(),
    });

    const updatedUser = await updateUserImageUseCase.execute({
      userId: user.id,
      image: generateFakeFile('test.png'),
      thumb: generateFakeFile('thumb.png'),
    });

    expect(updatedUser.imageId).not.toBeNull();
    expect(updatedUser.imageId).not.toBeUndefined();

    expect(updatedUser.thumbId).not.toBeNull();
    expect(updatedUser.thumbId).not.toBeUndefined();
  });

  it('should not be able to update an unexistent user', async () => {
    expect.assertions(1);

    try {
      await updateUserImageUseCase.execute({
        userId: 99999,
        image: generateFakeFile('test.png'),
        thumb: generateFakeFile('thumb.png'),
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
});

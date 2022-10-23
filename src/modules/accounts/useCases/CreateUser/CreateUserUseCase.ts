import { genSaltSync, hash } from 'bcryptjs';
import { ConflictError } from '@shared/infra/http/errors/ConflictError';
import { ICreateUserRequestDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { User } from '@modules/accounts/entities/User';
import { BadRequestError } from '@shared/infra/http/errors/BadRequestError';

export class CreateUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
    googleId,
  }: ICreateUserRequestDTO): Promise<User> {
    const alreadyExists = await this.usersRepository.findByEmail(email);

    if (alreadyExists != null) {
      throw new ConflictError('Esse email já está em uso');
    }

    if (this.isWeakPassword(password)) {
      throw new BadRequestError('Senha não cumpre os requisitos mínimos');
    }

    const passwordHash = await hash(password, genSaltSync(10));
    const createdUser = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      googleId,
    });

    return createdUser;
  }

  isWeakPassword(password: string): boolean {
    return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(password);
  }
}

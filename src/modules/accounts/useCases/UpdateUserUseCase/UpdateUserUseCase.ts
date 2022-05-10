import { inject, injectable } from 'tsyringe';
import { compare, genSaltSync, hashSync } from 'bcryptjs';

import { UpdateUserBO } from '@modules/accounts/bo/UpdateUserBO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { NotFoundException } from '@shared/errors/NotFoundException';
import { BadRequestException } from '@shared/errors/BadRequestException';
import { UnauthorizedException } from '@shared/errors/UnauthorizedException';
import { User } from '@modules/accounts/entities/User';
import { ConflictException } from '@shared/errors/ConflictException';

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({
    userId,
    password,
    currentPassword,
    email,
    name,
  }: UpdateUserBO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (password) {
      if (!currentPassword) {
        throw new BadRequestException('Informe a senha atual');
      }

      const isOldPasswordValid = await compare(currentPassword, user.password);

      if (!isOldPasswordValid) {
        throw new UnauthorizedException('Senha atual incorreta');
      }
    }

    if (email && email !== user.email) {
      const emailAlreadyInUse = await this.usersRepository.findByEmail(email);

      if (emailAlreadyInUse) {
        throw new ConflictException('Email já está em uso');
      }
    }

    return this.usersRepository.update(userId, {
      password: password ? hashSync(password, genSaltSync(10)) : undefined,
      email,
      name,
    });
  }
}

export { UpdateUserUseCase };

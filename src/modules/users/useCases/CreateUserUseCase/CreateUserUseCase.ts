import { inject, injectable } from 'tsyringe';
import { genSaltSync, hash } from 'bcryptjs';

import { ConflictException } from '@shared/errors/ConflictException';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  googleId?: string;
  facebookId?: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password, googleId, facebookId }: IRequest) {
    const alreadyExists = await this.usersRepository.findByEmail(email);

    if (alreadyExists) {
      throw new ConflictException('Esse email já está em uso');
    }

    if (googleId) {
      const googleAlreadyExists = await this.usersRepository.findByGoogleId(
        googleId
      );

      if (googleAlreadyExists) {
        throw new ConflictException(
          'Essa conta do google já possui um usuário cadastrado'
        );
      }
    }

    if (facebookId) {
      const facebookAlreadyExists = await this.usersRepository.findByFacebookId(
        facebookId
      );

      if (facebookAlreadyExists) {
        throw new ConflictException(
          'Essa conta do facebook já possui um usuário cadastrado'
        );
      }
    }

    const passwordHash = await hash(password, genSaltSync(10));

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      googleId,
      facebookId,
    });

    // TODO: Send welcome notification

    return createdUser;
  }
}

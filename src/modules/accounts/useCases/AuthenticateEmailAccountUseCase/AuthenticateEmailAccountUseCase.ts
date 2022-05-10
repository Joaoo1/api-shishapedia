import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UnauthorizedException } from '@shared/errors/UnauthorizedException';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateEmailAccountUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário e/ou senha incorretos');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuário e/ou senha incorretos');
    }

    const jwtToken = jwt.sign({ id: user.id }, authConfig.jwtSecret);

    return {
      accessToken: jwtToken,
    };
  }
}

export { AuthenticateEmailAccountUseCase };

import { inject, injectable } from 'tsyringe';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUserUseCase/CreateUserUseCase';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  facebookId: string;
  name: string;
}

@injectable()
class AuthenticateFacebookAccountUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ email, facebookId, name }: IRequest) {
    let user = await this.usersRepository.findByFacebookId(facebookId);

    if (!user) {
      const userWithEmail = await this.usersRepository.findByEmail(email);

      if (userWithEmail) {
        const updatedUser = await this.usersRepository.update(
          userWithEmail.id,
          { facebookId }
        );
        user = updatedUser;
      } else {
        const createUserUseCase = new CreateUserUseCase(this.usersRepository);
        const randomPassword = randomBytes(16).toString('hex');
        const createdUser = await createUserUseCase.execute({
          name,
          email,
          facebookId,
          password: randomPassword,
        });
        user = createdUser;
      }
    }

    const token = jwt.sign({ id: user.id }, authConfig.jwtSecret);

    return { accessToken: token };
  }
}

export { AuthenticateFacebookAccountUseCase };

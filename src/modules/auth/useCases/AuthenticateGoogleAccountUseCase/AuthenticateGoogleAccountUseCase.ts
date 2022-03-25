import { inject, injectable } from 'tsyringe';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { CreateUserUseCase } from '@modules/users/useCases/CreateUserUseCase/CreateUserUseCase';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  googleId: string;
  name: string;
}

@injectable()
class AuthenticateGoogleAccountUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ email, googleId, name }: IRequest) {
    let user = await this.usersRepository.findByGoogleId(googleId);

    if (!user) {
      const userWithEmail = await this.usersRepository.findByEmail(email);

      if (userWithEmail) {
        const updatedUser = await this.usersRepository.update(
          userWithEmail.id,
          { googleId }
        );
        user = updatedUser;
      } else {
        const createUserUseCase = new CreateUserUseCase(this.usersRepository);
        const randomPassword = randomBytes(16).toString('hex');
        const createdUser = await createUserUseCase.execute({
          name,
          email,
          googleId,
          password: randomPassword,
        });
        user = createdUser;
      }
    }

    const token = jwt.sign({ id: user.id }, authConfig.jwtSecret);

    return { accessToken: token };
  }
}

export { AuthenticateGoogleAccountUseCase };

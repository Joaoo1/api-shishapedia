import { CreateUserDao } from '../dao/CreateUserDao';
import { User } from '../entities/User';

export interface IUsersRepository {
  create(data: CreateUserDao): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByGoogleId(googleId: string): Promise<User | null>;
  findByFacebookId(facebookId: string): Promise<User | null>;
}

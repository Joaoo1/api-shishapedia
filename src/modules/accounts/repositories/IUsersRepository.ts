import { CreateUserDao } from '../dao/CreateUserDao';
import { User } from '../entities/User';

export interface IUsersRepository {
  create: (data: CreateUserDao) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
}

import { UpdateUserDao } from '@modules/users/dao/UpdateUserDao';
import { CreateUserDao } from '../../dao/CreateUserDao';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  private currentId = 1;

  async findById(id: number): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return this.users.find(user => user.googleId === googleId) || null;
  }

  async findByFacebookId(facebookId: string): Promise<User | null> {
    return this.users.find(user => user.facebookId === facebookId) || null;
  }

  async create(data: CreateUserDao): Promise<User> {
    const user = new User();
    Object.assign(user, {
      id: this.currentId,
      ...data,
    });
    this.currentId += 1;
    this.users.push(user);
    return user;
  }

  async update(userId: number, data: UpdateUserDao): Promise<User> {
    const user = this.users.find(u => u.id === userId);

    Object.assign(user, data);

    return user!;
  }
}

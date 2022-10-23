import { CreateUserDao } from '../../dao/CreateUserDao';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class FakeUsersRepository implements IUsersRepository {
  private readonly users: User[] = [];

  private currentId = 1;

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) ?? null;
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
}

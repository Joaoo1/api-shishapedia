import { CreateUserBO } from './CreateUserBO';

export interface UpdateUserBO
  extends Omit<Partial<CreateUserBO>, 'googleId' | 'facebookId'> {
  userId: number;
  currentPassword?: string;
}

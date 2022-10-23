export interface CreateUserDao {
  name: string;
  email: string;
  password: string;
  googleId?: string;
}

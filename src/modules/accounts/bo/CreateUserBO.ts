export interface CreateUserBO {
  name: string;
  email: string;
  password: string;
  googleId?: string;
  facebookId?: string;
}

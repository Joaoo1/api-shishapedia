export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  resetPasswordToken: string | null;
  resetPasswordExpires: Date | null;
  googleId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

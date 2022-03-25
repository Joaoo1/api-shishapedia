import { CreateUserDao } from './CreateUserDao';

export interface UpdateUserDao extends Partial<CreateUserDao> {
  imageId?: number | null;
  thumbId?: number | null;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  moderator?: boolean;
  fcmTokens?: string[];
}

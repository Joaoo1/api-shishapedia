import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '../../common/entities/BaseEntity';
import { UserImage } from './UserImage';

export class User extends BaseEntity {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  moderator: boolean;

  @Expose()
  @Type(() => UserImage)
  image?: UserImage;

  @Expose()
  @Type(() => UserImage)
  icon?: UserImage;

  password: string;

  fcmTokens: string[];

  resetPasswordToken: string | null;

  resetPasswordExpires: Date | null;

  googleId: string | null;

  facebookId: string | null;
}

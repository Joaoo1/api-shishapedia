import { Exclude, Expose, Type } from 'class-transformer';

import { BaseEntity } from '../../common/entities/BaseEntity';
import { UserImage } from './UserImage';

export class User extends BaseEntity {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  moderator: boolean;

  @Exclude()
  imageId?: number | null;

  @Expose()
  @Type(() => UserImage)
  image?: UserImage | null;

  @Exclude()
  thumbId?: number | null;

  @Expose()
  @Type(() => UserImage)
  thumb?: UserImage | null;

  password: string;

  fcmTokens: string[];

  resetPasswordToken: string | null;

  resetPasswordExpires: Date | null;

  googleId: string | null;

  facebookId: string | null;
}

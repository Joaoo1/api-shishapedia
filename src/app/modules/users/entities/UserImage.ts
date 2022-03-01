import { Expose } from 'class-transformer';

import { BaseEntity } from '../../common/entities/BaseEntity';

export class UserImage extends BaseEntity {
  @Expose()
  name: string;

  @Expose()
  path: string;
}

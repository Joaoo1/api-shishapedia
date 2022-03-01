import { Expose, Exclude } from 'class-transformer';

export class BaseEntity {
  @Expose()
  id: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}

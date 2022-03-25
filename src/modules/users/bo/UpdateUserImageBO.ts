import { Express } from 'express';

export interface UpdateUserImageBO {
  userId: number;
  image: Express.Multer.File | null;
  thumb: Express.Multer.File | null;
}

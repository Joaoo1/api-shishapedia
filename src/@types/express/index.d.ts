/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
  export interface Request {
    user: {
      id: number;
    };
    file?: Express.Multer.File;
    thumbFile?: Express.Multer.File;
  }
}

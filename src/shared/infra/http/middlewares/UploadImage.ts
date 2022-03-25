import { RequestHandler } from 'express';
import multer from 'multer';

import { SingleImageMulterOptions } from '@config/multer';
import { BadRequestException } from '@shared/errors/BadRequestException';

interface UploadImageParams {
  maxSizeMB?: number;
}

const DEFAULT_MAX_SIZE_MB = 1;

const formatMaxSize = (maxSize: number) => maxSize * 1024 * 1024;

const UploadImageMiddleware: (data: UploadImageParams) => RequestHandler = ({
  maxSizeMB,
}) => {
  const upload = multer({
    limits: { fileSize: formatMaxSize(maxSizeMB || DEFAULT_MAX_SIZE_MB) },
    ...SingleImageMulterOptions,
  }).single('image');

  return (req, res, next) => {
    upload(req, res, err => {
      if (err) {
        if (
          err instanceof multer.MulterError &&
          err.code === 'LIMIT_FILE_SIZE'
        ) {
          return next(
            new BadRequestException(
              `Tamanho máximo da imagem é de ${
                maxSizeMB || DEFAULT_MAX_SIZE_MB
              }MB`
            )
          );
        }

        return next(err);
      }

      return next();
    });
  };
};

export default UploadImageMiddleware;

import { RequestHandler } from 'express';

import { imagesUploadFolder } from '@config/multer';
import { InternalServerException } from '@shared/errors/InternalServerException';
import { compressImageToIcon } from '@shared/utils/Image';

const CreateThumbMiddleware: RequestHandler = async (req, res, next) => {
  if (!req.file) {
    throw new InternalServerException();
  }

  const fileName = `ic_${req.file.filename}`;
  const fileDest = `${imagesUploadFolder}/${fileName}`;

  await compressImageToIcon({ imagePath: req.file.path, fileDest });

  req.thumbFile = {
    ...req.file,
    filename: fileName,
    originalname: req.file.originalname,
  };

  return next();
};

export default CreateThumbMiddleware;

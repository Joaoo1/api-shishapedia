import { Options, diskStorage } from 'multer';
import { resolve, extname } from 'path';
import crypto from 'crypto';

const imagesUploadFolder = resolve(__dirname, '..', '..', 'uploads', 'images');

const SingleImageMulterOptions: Options = {
  storage: diskStorage({
    destination: imagesUploadFolder,
    // Format file name before save
    filename: (req, image, callback) => {
      crypto.randomBytes(3, (err, res) => {
        if (err) return callback(err, '');
        let name = res.toString('hex') + image.originalname;
        name = name.replace(' ', '');
        return callback(null, name);
      });
    },
  }),
  // Only accept images
  fileFilter: (req, file, callback) => {
    const ext = extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return callback(new Error('Apenas imagens são aceitas'));
    }
    return callback(null, true);
  },
};

export { SingleImageMulterOptions, imagesUploadFolder };

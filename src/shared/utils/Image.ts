import sharp from 'sharp';

interface CompressImageToIconParams {
  imagePath: string;
  fileDest: string;
}

const compressImageToIcon = async ({
  imagePath,
  fileDest,
}: CompressImageToIconParams) => {
  await sharp(imagePath).resize(80).toFile(fileDest);
};

export { compressImageToIcon };

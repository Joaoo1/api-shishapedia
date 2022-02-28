import { TooManyRequestsError } from 'src/app/errors/TooManyRequestsError';

export default {
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 500, // limit each IP to 500 requests per windowMs
  handler: () => {
    throw new TooManyRequestsError();
  },
};

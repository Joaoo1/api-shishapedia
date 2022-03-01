import { TooManyRequestsException } from '@shared/errors/TooManyRequestsException';

export default {
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 500, // limit each IP to 500 requests per windowMs
  handler: () => {
    throw new TooManyRequestsException();
  },
};

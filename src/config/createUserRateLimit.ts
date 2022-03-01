import { TooManyRequestsException } from '@errors/TooManyRequestsException';

export default {
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // limit each IP to 500 requests per windowMs
  handler: () => {
    throw new TooManyRequestsException();
  },
};

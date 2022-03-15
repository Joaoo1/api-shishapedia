import rateLimit from 'express-rate-limit';

import createUserRateLimit from '@config/createUserRateLimit';

const CreateUserRateLimit = rateLimit(createUserRateLimit);

export { CreateUserRateLimit };

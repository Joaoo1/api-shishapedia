import rateLimit from 'express-rate-limit';

import createAccountRateLimit from '@config/createAccountRateLimit';

const CreateAccountRateLimit = rateLimit(createAccountRateLimit);

export { CreateAccountRateLimit };

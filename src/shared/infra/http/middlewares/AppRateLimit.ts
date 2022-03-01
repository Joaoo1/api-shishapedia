import rateLimit from 'express-rate-limit';

import appRateLimit from '@config/appRateLimit';

const AppRateLimit = rateLimit(appRateLimit);

export { AppRateLimit };

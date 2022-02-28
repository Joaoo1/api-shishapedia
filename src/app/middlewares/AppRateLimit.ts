import rateLimit from 'express-rate-limit';

const AppRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  handler: (_, res) =>
    res.status(429).json({
      error:
        'Muitas requisições foram feitas do seu IP. Tente novamente em alguns minutos',
    }),
});

export { AppRateLimit };

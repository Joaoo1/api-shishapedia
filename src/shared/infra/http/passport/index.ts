import passport from 'passport';

import { FacebookStrategy } from './strategies/FacebookStrategy';
import { GoogleStrategy } from './strategies/GoogleStrategy';

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user as any);
});

passport.use(GoogleStrategy());

passport.use(FacebookStrategy());

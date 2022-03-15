import GoogleOAuth from 'passport-google-oauth20';

import { googleStrategyOptions } from '@config/passport';

export interface IGoogleAuthUser {
  email: string;

  name: string;

  googleId: string;
}

function GoogleStrategy() {
  return new GoogleOAuth.Strategy(
    googleStrategyOptions,
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user: IGoogleAuthUser = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails ? profile?.emails[0].value : '',
        };
        return done(null, user);
      } catch (err: any) {
        return done(err.message);
      }
    }
  );
}

export { GoogleStrategy };

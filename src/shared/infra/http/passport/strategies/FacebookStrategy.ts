import FacebookOAuth from 'passport-facebook';

import { facebookStrategyOptions } from '@config/passport';

export interface IFacebookAuthUser {
  email: string;

  name: string;

  facebookId: string;
}

function FacebookStrategy() {
  return new FacebookOAuth.Strategy(
    facebookStrategyOptions,
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user: IFacebookAuthUser = {
          facebookId: profile.id,
          name: profile.displayName,
          email: profile.emails ? profile.emails[0].value : '',
        };
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  );
}

export { FacebookStrategy };

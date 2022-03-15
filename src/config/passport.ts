import FacebookOAuth from 'passport-facebook';
import GoogleOAuth from 'passport-google-oauth20';

export const googleStrategyOptions: GoogleOAuth.StrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
};

export const facebookStrategyOptions: FacebookOAuth.StrategyOption = {
  clientID: process.env.FACEBOOK_CLIENT_ID || '',
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
  callbackURL: process.env.FACEBOOK_CALLBACK_URL || '',
};

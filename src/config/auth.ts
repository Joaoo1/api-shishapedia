import { Secret } from 'jsonwebtoken';

export default {
  jwtSecret: process.env.JWT_SECRET as Secret,
};

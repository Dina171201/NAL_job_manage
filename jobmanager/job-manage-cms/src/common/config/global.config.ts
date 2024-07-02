import * as dotenv from 'dotenv';
dotenv.config();

const globalConfig = {
  environment: process.env.NODE_ENV,
  port: Number(process.env.PORT) || 5000,
  auth: {
    accessToken: {
      secret: process.env.AUTH_JWT_ACCESS_TOKEN_KEY,
      algorithm: 'HS256',
      expiresTime: process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRE,
    },

    refreshToken: {
      secret: process.env.AUTH_JWT_REFRESH_TOKEN_KEY,
      algorithm: 'HS256',
      expiresTime: process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRE,
    },
  },
};

export default globalConfig;
export type GlobalConfig = Record<string, any>;

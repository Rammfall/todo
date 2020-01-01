export const environment: string = process.env.environment || 'development';
export const PORT: string | number = process.env.PORT || 3003;
export const bcryptRoundSalt: string | number =
  process.env.bcryptRoundSalt || 10;
export const jwtAccessSecret: string =
  process.env.jwtAccessSecret || 'jwtSecret';
export const jwtAccessExpiredTime: string =
  process.env.jwtAccessExpiredTime || '15m';
export const jwtAccessTokenWord: string =
  process.env.jwtAccessTokenWord || 'Hater';
export const jwtRefreshSecret: string =
  process.env.jwtRefreshSecret || 'jwtSecret2';
export const jwtRefreshExpiredTime: string =
  process.env.jwtRefreshExpiredTime || '32h';
export const jwtRefreshTokenWord: string =
  process.env.jwtRefreshTokenWord || 'Catter';

import UserSession from '../db/entity/userSession';

export interface LoginData {
  accessToken: string;
  refreshToken: string;
  session: UserSession;
}

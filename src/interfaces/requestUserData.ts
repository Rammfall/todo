import { Request } from 'express';

export interface RequestUserDataJwt extends Request {
  userData: string | object;
}

export interface RequestUserData extends Request {
  userData: {
    id: number;
  };
}

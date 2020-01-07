import { Request, Response } from 'express';
import refresh from './methods/refresh';

export default async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    res.json({ info: await refresh(refreshToken) });
  } catch (e) {
    res.status(403).json({ info: e.message });
  }
};

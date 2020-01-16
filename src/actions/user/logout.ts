import { Response, Request } from 'express';

import logout from './methods/logout';

export default async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    res.json({ info: await logout(refreshToken) });
  } catch (e) {
    res.status(500).json({ info: e.message });
  }
};

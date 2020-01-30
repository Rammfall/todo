import { Request, Response } from 'express';

import all from './methods/all';

export default async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const projects = await all(id);

    res.json({ projects });
  } catch (e) {
    res.status(500).json({ info: e.message });
  }
};

import { Request, Response } from 'express';

import all from './methods/all';

export default async (req: Request, res: Response) => {
  const { id } = req.body;
  const { take, skip } = req.query;

  try {
    const projects = await all(id, take, skip);

    res.json({ projects });
  } catch (e) {
    res.status(500).json({ info: e.message });
  }
};

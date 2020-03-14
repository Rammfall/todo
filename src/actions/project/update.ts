import { Request, Response } from 'express';

import update from './methods/update';

export default async (req: Request, res: Response) => {
  const { id, name } = req.body;

  try {
    const projects = await update(id, name);

    res.json({ projects });
  } catch (e) {
    res.status(500).json({ info: e.message });
  }
};

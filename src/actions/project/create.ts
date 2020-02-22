import { Request, Response } from 'express';

import create from './methods/create';

export default async (req: Request, res: Response) => {
  const { id, name } = req.body;

  try {
    const projects = await create(id, name);

    res.json({ projects });
  } catch (e) {
    res.status(500).json({ info: e.message });
  }
};

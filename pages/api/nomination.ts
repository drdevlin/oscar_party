import { connect } from '@/db';
import { Nomination } from '@/db/models';
import { post, patch, del } from '@/db/handlers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  switch (req.method) {
    case 'GET': {
      const nominations = await Nomination.find({}).populate('movie').populate('category').exec();
      res.status(200).json({ data: nominations });
      break;
    }
    case 'POST': {
      await post(Nomination, req, res);
      break;
    }
    case 'PATCH': {
      await patch(Nomination, req, res);
      break;
    }
    case 'DELETE': {
      await del(Nomination, req, res);
      break;
    }
  }
}

import { connect } from '@/db';
import { Nomination } from '@/db/models';
import { post, patch, del } from '@/db/handlers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  switch (req.method) {
    case 'GET': {
      const { query } = req;
      const forCategory = Object.keys(query).includes('category');
      const scope = forCategory ? { category: query.category } : {};
      const nominations = await Nomination.find(scope).populate('nominee').populate('category').exec();
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

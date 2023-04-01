import { connect } from '@/db';
import { Selection } from '@/db/models';
import { post, patch, del } from '@/db/handlers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  switch (req.method) {
    case 'GET': {
      const { query } = req;
      const byUser = Object.keys(query).includes('user');
      const scope = byUser ? { user: query.user } : {};
      const selections = await Selection.find(scope)
        .populate('user')
        .populate({
          path: 'nomination',
          populate: ['nominee', 'category']
        }).exec();
      res.status(200).json({ data: selections });
      break;
    }
    case 'POST': {
      await post(Selection, req, res);
      break;
    }
    case 'PATCH': {
      await patch(Selection, req, res);
      break;
    }
    case 'DELETE': {
      await del(Selection, req, res);
      break;
    }
  }
}

import { connect } from '@/db';
import { Selection } from '@/db/models';
import { post, patch, del } from '@/db/handlers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  switch (req.method) {
    case 'GET': {
      const selections = await Selection.find({})
        .populate('user')
        .populate({
          path: 'nomination',
          populate: ['movie', 'category']
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

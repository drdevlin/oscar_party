import { connect } from '@/db';
import { Category } from '@/db/models';
import { get, post, patch, del } from '@/db/handlers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  switch (req.method) {
    case 'GET': {
      await get(Category, req, res);
      break;
    }
    case 'POST': {
      await post(Category, req, res);
      break;
    }
    case 'PATCH': {
      await patch(Category, req, res);
      break;
    }
    case 'DELETE': {
      await del(Category, req, res);
      break;
    }
  }
}

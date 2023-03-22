import { connect } from '@/db';
import { Movie } from '@/db/models';
import { get, post, patch, del } from '@/db/handlers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  switch (req.method) {
    case 'GET': {
      await get(Movie, req, res);
      break;
    }
    case 'POST': {
      await post(Movie, req, res);
      break;
    }
    case 'PATCH': {
      await patch(Movie, req, res);
      break;
    }
    case 'DELETE': {
      await del(Movie, req, res);
      break;
    }
  }
}

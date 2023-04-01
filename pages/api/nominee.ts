import { connect } from '@/db';
import { Nominee } from '@/db/models';
import { get, post, patch, del } from '@/db/handlers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  switch (req.method) {
    case 'GET': {
      await get(Nominee, req, res);
      break;
    }
    case 'POST': {
      await post(Nominee, req, res);
      break;
    }
    case 'PATCH': {
      await patch(Nominee, req, res);
      break;
    }
    case 'DELETE': {
      await del(Nominee, req, res);
      break;
    }
  }
}

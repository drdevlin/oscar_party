import { connect } from '@/db';
import { User } from '@/db/models';
import { userGet, post, patch, del } from '@/db/handlers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  switch (req.method) {
    case 'GET': {
      await userGet(User, req, res);
      break;
    }
    case 'POST': {
      await post(User, req, res);
      break;
    }
    case 'PATCH': {
      await patch(User, req, res);
      break;
    }
    case 'DELETE': {
      await del(User, req, res);
      break;
    }
  }
}

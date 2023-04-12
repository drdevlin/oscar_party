import { unsealData } from 'iron-session';
import { withSession } from '@/lib/withSession';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const [seal] = Array.isArray(req.query.seal) ? req.query.seal : [req.query.seal];
  
  if (!seal) {
	  res.status(400).json({ error: 'No seal.' });
	  return;
  }
  
  if (!process.env.IRON_PRIVATE_KEY) {
    res.status(500);
    return;
  }
  
  const token = await unsealData(seal, {
	  password: process.env.IRON_PRIVATE_KEY,
  }) as typeof req.session.token;

  req.session.token = token;

  await req.session.save();

  res.redirect('/');
}

export default withSession(handler);
import bcrypt from 'bcrypt';
import { connect } from '@/db';
import { User } from '@/db/models';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);

    // Check for user id.
    if (!body.user) {
      res.status(400).json({ error: 'No user id.' });
      return;
    }

    // Check for pin.
    if (!body.pin) {
      res.status(400).json({ error: 'No pin.' });
      return;
    }

    // Get user.
    const user = await User.findById(body.user).exec();
    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    // Get user's pin.
    const userPin = JSON.parse(JSON.stringify(user)).pin;

    // Test pin.
    const auth = await bcrypt.compare(body.pin, userPin);
    if (!auth) {
      res.status(401).json({ error: 'Incorrect pin.' });
      return;
    }
    res.status(200).json({ data: { auth } });
  }
}

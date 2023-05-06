import { getSession } from 'next-auth/react';
import dbConnect from '../../mongodb/index.js';
import Account from '../../mongodb/index.js';

export default async function handler(req, res) {
//   const session = await getSession({ req });

//   if (!session) {
//     res.status(401).json({ message: 'Unauthorized' });
//     return;
//   }

  const { username } = req.query;

  try {
    await dbConnect();

    const account = await Account.findOne({ username });
    
    if (!account) {
      res.status(404).json({ message: 'Account not found' });
      return;
    }

    res.status(200).json({ transactions: account.transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

import { connect } from '@/db';
import { Selection } from '@/db/models';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  if (req.method === 'GET') {
    // Build a tally collection.
    const tallyCollection = await Selection.aggregate([
      // Populate `nomination` field.
      {
        '$lookup': {
          'from': 'nominations', 
          'localField': 'nomination', 
          'foreignField': '_id', 
          'as': 'nomination'
        }
      // Filter out incorrect selections.
      }, {
        '$match': {
          'nomination.win': true
        }
      // Populate `nomination.category` field.
      }, {
        '$lookup': {
          'from': 'categories', 
          'localField': 'nomination.category', 
          'foreignField': '_id', 
          'as': 'nomination.category'
        }
      // Filter out other years.
      }, {
        '$match': {
          'nomination.category.year': 2023
        }
      // Populate 'user' field.
      }, {
        '$lookup': {
          'from': 'users', 
          'localField': 'user', 
          'foreignField': '_id', 
          'as': 'user'
        }
      // Turn the user array with one document element into just the document.
      }, {
        '$addFields': {
          'user': {
            '$first': '$user'
          }
        }
      // Remove 'user.pin' field.
      }, {
        '$project': {
          'user': {
            'pin': false
          }
        }
      // Turn the category array with one document element into just the document.
      }, {
        '$addFields': {
          'nomination.category': {
            '$first': '$nomination.category'
          }
        }
      // Calculate the scores.
      }, {
        '$group': {
          '_id': '$user', 
          'score': {
            '$sum': '$nomination.category.points'
          }
        }
      // Rename '_id' to 'user.
      }, {
        '$project': {
          '_id': false,
          'user': '$_id',
          'score': '$score'
        }
      // Sort highest to lowest.
      }, {
        '$sort': {
          'score': -1
        }
      }
    ]);
	
    res.status(200).json({ data: tallyCollection });
  }
}

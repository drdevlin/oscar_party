import { connect } from '@/db';
import { Selection } from '@/db/models';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  if (req.method === 'GET') {
	const { year } = req.query;

	// Check for year.
	if (!year) {
	  res.status(400).json({ error: 'No year selected.' });
	  return;
	}

	// Get user scores for the year.
	const userScores = await Selection.aggregate([
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
          'nomination.category.year': Number(year)
        }
      // Populate 'user' field.
      }, {
        '$lookup': {
          'from': 'users', 
          'localField': 'user', 
          'foreignField': '_id', 
          'as': 'user'
        }
      // Map user documents to just the ids.
      }, {
        '$addFields': {
          'user': {
            '$first': '$user._id'
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
      // Sort highest to lowest.
      }, {
        '$sort': {
          'score': -1
        }
      }
    ]);
    
  // Extract the winner. (Many when tied.)
  const winner = userScores
    .filter((userScore, _, [userHighScore]) => userScore.score === userHighScore.score)
    .map((userScore) => userScore._id);
	
	res.status(200).json({ data: winner });
  }
}

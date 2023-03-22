import type { Model } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

export const get = async (Model: Model<any>, req: NextApiRequest, res: NextApiResponse) => {
  const documents = await Model.find({});
  res.status(200).json({ data: documents });
};

export const post = async (Model: Model<any>, req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  await Model.validate(body);
  const createdDocument = await Model.create(body);
  res.status(200).json({ data: createdDocument });
};

export const patch = async (Model: Model<any>, req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  if (!body._id) {
    res.status(400).json({ error: 'No id.' });
    return;
  }
  const update = JSON.parse(req.body);
  delete update._id;
  const updatedDocument = await Model.updateOne({ _id: body._id, }, update);
  res.status(200).json({ data: updatedDocument });
};

export const del = async (Model: Model<any>, req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  if (!body._id) {
    res.status(400).json({ error: 'No id.' });
    return;
  }
  const deleteResult = await Model.deleteOne({ _id: body._id, });
  res.status(200).json({ data: deleteResult });
};

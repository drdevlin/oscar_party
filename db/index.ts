import mongoose from 'mongoose';

export const connect = async () => await mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority`,
  { dbName: 'oscarParty'}
);

export const disconnect = mongoose.disconnect;

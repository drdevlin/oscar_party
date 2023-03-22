import { Schema, model, modelNames, Types } from "mongoose";
import {
  Movie as MovieType,
  User as UserType,
  Category as CategoryType,
  Nomination as NominationType,
  Selection as SelectionType,
} from "@/types";

const models = modelNames();

const makeModel = <ModelType>(name: string, schema: any) => (
  models.includes(name) ? model<ModelType>(name) : model<ModelType>(name, schema)
);

const movieSchema = new Schema<MovieType>({
  _id: { type: Types.ObjectId },
  title: { type: String, required: true },
});
export const Movie = makeModel('Movie', movieSchema);

const userSchema = new Schema<UserType>({
  _id: { type: Types.ObjectId },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
});
export const User = makeModel('User', userSchema);

const categorySchema = new Schema<CategoryType>({
  _id: { type: Types.ObjectId },
  name: { type: String, required: true },
  year: { type: Number, required: true },
});
export const Category = makeModel('Category', categorySchema);

const nominationSchema = new Schema<NominationType>({
  _id: { type: Types.ObjectId },
  movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  win: { type: Boolean, required: true },
});
export const Nomination = makeModel('Nomination', nominationSchema);

const selectionSchema = new Schema<SelectionType>({
  _id: { type: Types.ObjectId },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  nomination: { type: Schema.Types.ObjectId, ref: 'Nomination', required: true },
});
export const Selection = makeModel('Selection', selectionSchema);

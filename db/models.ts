import { Schema, model, modelNames, Types, deleteModel } from "mongoose";
import {
  Nominee as NomineeType,
  User as UserType,
  Category as CategoryType,
  Nomination as NominationType,
  Selection as SelectionType,
} from "@/types";

// deleteModel('Nominee');
const models = modelNames();

const makeModel = <ModelType>(name: string, schema: any) => (
  models.includes(name) ? model<ModelType>(name) : model<ModelType>(name, schema)
);

const nomineeSchema = new Schema<NomineeType>({
  name: { type: String, required: true },
});
export const Nominee = makeModel('Nominee', nomineeSchema);

const userSchema = new Schema<UserType>({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
});
export const User = makeModel('User', userSchema);

const categorySchema = new Schema<CategoryType>({
  name: { type: String, required: true },
  year: { type: Number, required: true },
});
export const Category = makeModel('Category', categorySchema);

const nominationSchema = new Schema<NominationType>({
  nominee: { type: Schema.Types.ObjectId, ref: 'Nominee', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  win: { type: Boolean, required: true },
});
export const Nomination = makeModel('Nomination', nominationSchema);

const selectionSchema = new Schema<SelectionType>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  nomination: { type: Schema.Types.ObjectId, ref: 'Nomination', required: true },
});
export const Selection = makeModel('Selection', selectionSchema);

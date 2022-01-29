import { Schema, Model, Types, model } from 'mongoose';

type IICon = {
  provider: string; name: string
}

export type ICategory = {
  name: string;
  active: boolean;
  icon: Types.Subdocument<IICon>
}

const iconSchema = new Schema<IICon, Model<IICon>>({
  name: String,
  provider: String,
}, { _id: false });

const categorySchema = new Schema<ICategory, Model<ICategory>>({
  name: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true,
  },
  icon: iconSchema
}, { timestamps: true });


export default model('Category', categorySchema);

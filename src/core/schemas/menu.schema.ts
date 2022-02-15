import { Schema, Model, Types, model } from 'mongoose';

export type IProduct = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  active: boolean;
  photos: Types.Array<String>;
}

export type IMenu = {
  name: string;
  active: boolean;
  company: Types.ObjectId;
  products: Types.DocumentArray<IProduct>;
}

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  active: { type: String, default: true },
  photos: { type: [String], default: [] },
});

const menuSchema = new Schema<IMenu, Model<IMenu>>({
  name: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false,
  },
  company: {
    type: Types.ObjectId,
    required: true,
  },
  products: [productSchema]
}, { timestamps: true });


export default model('Menu', menuSchema);

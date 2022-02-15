import { Schema, Model, Types, model } from 'mongoose';

type ICity = {
  name: string;
  active: boolean;
  state: Types.ObjectId;
  neighborhoods: Types.Array<string>;
}

const citySchema = new Schema<ICity, Model<ICity>>({
  name: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false,
  },
  neighborhoods: [String],
  state: {
    type: Types.ObjectId,
    required: true,
    ref: 'State',
  }
}, { timestamps: true });


const City = model('City', citySchema);

export default City;

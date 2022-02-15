import { Schema, Model, Types, model } from 'mongoose';

import City from './city.schema';

type IRole = 'Admin' | 'CityManager'

type IUser = {
  name: string;
  email: string;
  password: string;
  cellphone: string;
  roles: Types.Array<IRole>;
  active: boolean;
  city: Types.ObjectId;
  avatar: string;
}

const userSchema = new Schema<IUser, Model<IUser>>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cellphone: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: null,
  },
  active: {
    type: Boolean,
    default: false,
  },
  roles: {
    type: [String],
    required: true,
    enum: ['Admin', 'CityManager']
  },
  city: {
    type: Types.ObjectId,
    ref: City,
  }
}, { timestamps: true });


export default model('User', userSchema);

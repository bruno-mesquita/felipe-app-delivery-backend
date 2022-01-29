import { Schema, Model, model } from 'mongoose';

export interface IState  {
  name: string;
  active: boolean;
}

const stateSchema = new Schema<IState, Model<IState>>({
  name: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });


const State = model('State', stateSchema);

export default State;

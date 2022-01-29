import { Schema, Model, Types, model } from 'mongoose';

type IDeliveryMan = {
  name: string;
  cellphone: string;
  entryTime: number;
  departureTime: number;
  city: Types.ObjectId;
}

const deliveryManSchema = new Schema<IDeliveryMan, Model<IDeliveryMan>>({
  name: {
    type: String,
    required: true
  },
  cellphone: {
    type: String,
    required: true
  },
  entryTime: {
    type: Number,
    required: true
  },
  departureTime: {
    type: Number,
    required: true
  },
  city: {
    type: Types.ObjectId,
    required: true,
    ref: 'City',
  }
}, { timestamps: true });


export default model('DeliveryMan', deliveryManSchema);

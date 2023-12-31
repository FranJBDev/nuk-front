import { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
  userEmail: String,
  line_items: Object,
  name: String,
  email: String,
  city: String,
  postalCode: String,
  streetAddress: String,
  state: String,
  paid: Boolean,
}, {
    timestamps: true
});

export const Order = models?.Order || model('Order', OrderSchema);

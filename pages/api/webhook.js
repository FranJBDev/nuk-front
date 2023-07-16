import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Orders';
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from 'micro';

const endpointSecret =
  'whsec_87de6c9d55a29b903496ca979cd34bb3d61e2bda5265255df3b0736fa56d83f3';

export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': // 'payment_intent.succeeded':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('Ok');
}

export const config = {
  api: { bodyParser: false },
};

// charm-upheld-vivid-cheery
// acct_1KJy4vFKWE12IsKy

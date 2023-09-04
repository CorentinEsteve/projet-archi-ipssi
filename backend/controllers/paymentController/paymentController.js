const stripe = require('stripe')('sk_test_51NjToNBdjD7XjhkGbYAMaoObG1FmrEhepiMdIGigaVsd22ahL6xmKZfIRHezZy2SG6RaruRl4kp1yPULHEMxhCA30082KsfzdH');
const stripePayment = async (req, res) => {

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1NjU4IBdjD7XjhkGuIoDSA0N',
          quantity: 1,
        },
      ],
      invoice_creation: {
        enabled: true
      },
      billing_address_collection: 'required',
      mode: 'payment',
      success_url: "http://localhost:3000/customerDashboard/profile?success=true",
      cancel_url: "http://localhost:3000/customerDashboard/profile?canceled=true"
    });

    res.status(200).json(session);
    return;
  };

module.exports = {stripePayment};
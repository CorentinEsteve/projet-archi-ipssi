const stripe = require('stripe')('sk_test_51NjToNBdjD7XjhkGbYAMaoObG1FmrEhepiMdIGigaVsd22ahL6xmKZfIRHezZy2SG6RaruRl4kp1yPULHEMxhCA30082KsfzdH');

const stripePayment = async (req, res) => {

  console.log("iSignUpStep", req.params.isSignUpStep);
  const isSignUpStep = req.params.isSignUpStep;
  

  const cancelUrl = isSignUpStep == "true" ? "http://localhost:3000/signUp?canceled=true": "http://localhost:3000/customerDashboard/payment?canceled=true";
  console.log("cancelUrl",cancelUrl);

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
      mode: 'payment',
      success_url: "http://localhost:3000/customerDashboard/payment?success=true",
      cancel_url: cancelUrl
    });

    res.status(200).json(session);
    return;
  };

module.exports = {stripePayment};
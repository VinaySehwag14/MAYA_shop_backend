const router = require("express").Router();
const Stripe = require("stripe");

// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const stripe = Stripe(
  "sk_test_51KYOieSHTjC3fJnaXrxlEwFFv0nfACYlAZas3li4NGUeJzA4LxKtoiRkNp8ALdeOScZrARMEqYXix7f1AY7m8jXQ00AFX4l43h"
);

router.post("/payment", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(400).json({ error: { message: e.message } });
  }
});
// router.post("/payment", (req, res) => {
//   stripe.paymentIntents.create(
//     {
//       source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: "usd",
//       payment_method_types: ["card"],
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         res.status(500).json(stripeErr);
//       } else {
//         console.log(stripeRes, "this is stript res");
//         res.status(200).json(stripeRes);
//       }
//     }
//   );
// });

module.exports = router;

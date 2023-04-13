const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/payment", async (req, res) => {
  try {
    const payment = await instance.orders.create({
      amount: req.body.amount * 100, // amount is in paisa, so multiply by 100
      currency: "INR",
      payment_capture: 1,
    });

    res.send({
      paymentId: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      orderId: payment.order_id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/success", async (req, res) => {
  try {
    const { paymentId, orderId, signature } = req.body;

    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${paymentId}|${orderId}`);
    const digest = shasum.digest("hex");

    if (digest !== signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    res.send("Payment successful!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

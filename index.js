const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
dotenv.config();

//*uses cors for cross platform accessing
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection successful!"))
  .catch((err) => {
    console.log(err);
  });

//* routes
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.get("/api/test", () => {});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//* CORS applied
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin , X-Requested-With, Content-Type , Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");

  next();
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server listening on port ${port}`);
});

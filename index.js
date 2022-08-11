const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

dotenv.config();

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

app.get("/api/test", () => {});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server listening on port ${port}`);
});

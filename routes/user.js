const express = require("express");
const router = express.Router();

router.get("/usertest", (req, res) => {
  res.send("user test is success");
});

router.post("/usertest", (req, res) => {
  const username = req.body.username;
  console.log(username);
});
module.exports = router;

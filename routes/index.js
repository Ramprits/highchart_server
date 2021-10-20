const express = require("express");
const router = express.Router();

router.post("/", async function (req, res) {
  res.status(200).json({ message: "Hello world" });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const fs = require("fs");
const chartExporter = require("highcharts-export-server");
const imageUpload = require("../utils/imageUpload");
const url = require("url");
const { sendEmail } = require("../utils/sendEmail");

chartExporter.initPool();

router.post("/", async (req, res) => {
  let fileUrl;
  chartExporter.export(
    {
      type: "png",
      options: req.body.options,
      width: 1200,
    },
    async (err, res) => {
      let imageb64 = res.data;
      if (res.data) {
        fileUrl = await imageUpload(imageb64);
        console.log(fileUrl);
      }
      chartExporter.killPool();
    }
  );

  setTimeout(() => {
    sendEmail({ email: "rps.sitel@gmail.com" }, fileUrl);
    res.json({ message: "Successfully generated chart", fileUrl });
  }, 3000);
});

module.exports = router;

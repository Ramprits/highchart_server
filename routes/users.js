const express = require('express');
const router = express.Router();
const fs = require("fs");
const chartExporter = require("highcharts-export-server");
const imageUpload = require("../utils/imageUpload");
const url = require("url");

chartExporter.initPool();

/* GET users listing. */
router.post('/', async (req, res) => {

    let fileUrl;

// Export chart using these options
    chartExporter.export({
        type: "png",
        options: req.body.options,
        width: 1200
    }, async (err, res) => {
        let imageb64 = res.data;
        if (res.data) {
            fileUrl = await imageUpload(imageb64)
            console.log(fileUrl)
        }
        // Filename of the output. In this case, we will write the image
        // to the same directory of the initialization script.
        // let outputFile = "./output-chart.png";

        // Save the image data to a file
        // fs.writeFileSync(outputFile, imageb64, "base64", function (err) {
        //     if (err) console.log(err);
        // });
        chartExporter.killPool();
    });
    setTimeout(() => {
        res.json({message: "Successfully generated chart", fileUrl});
    }, 10000)

});

module.exports = router;

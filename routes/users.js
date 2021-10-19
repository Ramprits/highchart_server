const express = require('express');
const router = express.Router();
const fs = require("fs");
const chartExporter = require("highcharts-export-server");
const imageUpload = require("../utils/imageUpload");
const url = require("url");

chartExporter.initPool();

/* GET users listing. */
router.post('/', async (req, res, next) => {

    let chartOptions = {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Historic World Population by Region'
        },
        subtitle: {
            text: 'Source: Our Code World'
        },
        xAxis: {
            categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Population (millions)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Year 1800',
            data: [107, 31, 635, 203, 2]
        }, {
            name: 'Year 1900',
            data: [133, 156, 947, 408, 6]
        }, {
            name: 'Year 2000',
            data: [814, 841, 3714, 727, 31]
        }, {
            name: 'Year 2016',
            data: [1216, 1001, 4436, 738, 40]
        }]
    };
    let fileUrl;

// Export chart using these options
    chartExporter.export({
        type: "png",
        options: req.body.options,
        width: 1200
    }, async (err, res) => {
        let imageb64 = res.data;
        fileUrl = await imageUpload(imageb64)
        // Filename of the output. In this case, we will write the image
        // to the same directory of the initialization script.
        // let outputFile = "./output-chart.png";

        // Save the image data to a file
        // fs.writeFileSync(outputFile, imageb64, "base64", function (err) {
        //     if (err) console.log(err);
        // });
        chartExporter.killPool();
    });
    res.json({message: "Successfully generated chart", fileUrl});
});

module.exports = router;

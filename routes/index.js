const express = require('express');
const router = express.Router();
const imageUpload = require('../utils/imageUpload')

router.post('/', async function (req, res, next) {

    const url = await imageUpload(req.body.file)
     res.json({
        url
    });
});

module.exports = router;

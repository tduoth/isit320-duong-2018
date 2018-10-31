var express = require('express');
var router = express.Router();
const program = require('commander');

/* GET home page. */

const scriptPusher = require("WHAT GOES HERE?");

router.get('/copy-script', function(request, response) {
    'use strict';
    copyFile()
        .then((result) => {
            console.log(JSON.stringify(result, null, 4));
            response.send(result);
        })
        .catch((err) => {
            console.log(err);
            response.send(err);
        })

});




module.exports = router;

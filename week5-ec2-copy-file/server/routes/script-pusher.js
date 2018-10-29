var express = require('express');
var router = express.Router();
const spawn = require('child_process').spawn;

/* GET home page. */



router.get('/copy-script', function(request, response) { 'use strict';
    response.send({ result: 'success' });
});

module.exports = router;

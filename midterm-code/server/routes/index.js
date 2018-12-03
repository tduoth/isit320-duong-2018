var express = require('express');
var router = express.Router();
const Client = require('ssh2').Client;

/* GET home page. */
router.get('/', function(req, res) {
    'use strict';
    res.render('index', { title: 'System Check Refactor', author: 'By Thanh Duong' });
    
});

router.get('/foo', (request, response) => {
    'use strict';
    response.send({ file: 'api.js',  result: 'success', status: 'bar' });
});

module.exports = router;

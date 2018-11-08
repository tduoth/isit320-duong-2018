var express = require('express');
var router = express.Router();
runCpuInfo(hostAddress, response);

/* GET home page. */
router.get('/', function(req, res, next) { 'use strict';
  res.render('index', { title: 'server' });
});

module.exports = router;

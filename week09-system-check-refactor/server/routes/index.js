var express = require('express');
var router = express.Router();
const Client = require('ssh2').Client;

/* GET home page. */
router.get('/', function(req, res, next) { 'use strict';
  res.render('index', { title: 'server', author: 'Thanh Duong' });
});

module.exports = router;

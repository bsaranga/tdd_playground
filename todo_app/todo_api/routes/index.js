var express = require('express');
var router = express.Router();
const TodoManagerSingleton = require('../src/TodoManagerSingleton');

const todoManager = TodoManagerSingleton.getInstance();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({tasks: []})
});

module.exports = router;
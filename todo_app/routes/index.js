var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { tasks: [] });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  res.render('index', { tasks: [req.body] });
});

module.exports = router;

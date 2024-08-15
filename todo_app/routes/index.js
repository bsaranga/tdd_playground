var express = require('express');
var router = express.Router();
const { createDate } = require('../src/utilities/utils');
const TodoManagerSingleton = require('../src/TodoManagerSingleton');

const todoManager = TodoManagerSingleton.getInstance();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { tasks: [] });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  const dueDate = createDate(req.body.dueDate, req.body.time);
  todoManager.addTask(req.body.title, req.body.description, dueDate, req.body.priority);
  res.render('index', { tasks: todoManager.getAllTasks() });
});

module.exports = router;
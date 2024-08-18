var express = require('express');
var router = express.Router();
const TodoManagerSingleton = require('../src/TodoManagerSingleton');
const { createDate } = require('../src/utilities/utils');

const todoManager = TodoManagerSingleton.getInstance();

router.get('/tasks', function(req, res, next) {
  try {
    const allTasks = todoManager.getAllTasks();
    res.status(200).json(allTasks); 
  } catch (error) {
    res.status(500).json({ error: "An uncaught error occurred." });
  }
});

router.post('/tasks', function(req, res, next) {
  
  try {
    
    const { title, description, dueDateStr, dueTimeStr, priority } = req.body;
    const dueDate = createDate(dueDateStr, dueTimeStr);

    todoManager.addTask(title, description, new Date(dueDate), priority);
    res.status(200).json(todoManager.getAllTasks());

  } catch (error) {

    if (error.name === "TaskAlreadyExistsError") {
      res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "An uncaught error occurred." });
  }
});

router.delete('/tasks/:id', function(req, res, next) {
  try {
    
    const { id } = req.params;
    todoManager.removeTask(id);
    res.status(200).json(todoManager.getAllTasks());

  } catch (error) {
    
    res.status(500).json({ error: "An uncaught error occurred." });

  }
})

module.exports = router;
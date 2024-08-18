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

router.get('/tasks/search', function(req, res, next) {
  try {
    
    const { title } = req.query;
    console.log(title);

    const tasks = todoManager.searchTasksByTitle(title);
    res.status(200).json(tasks);

  } catch (error) {
    
    res.status(500).json({ error: "An uncaught error occurred." });

  }
});

router.get('/tasks/:id', function(req, res, next) {
  try {
    const { id } = req.params;
    const task = todoManager.getTaskById(id);
    res.status(200).json(task);
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

router.put('/tasks/:id', function(req, res, next) {
  try {
    
    const { id } = req.params;
    const { title, description, dueDateStr, dueTimeStr, priority } = req.body;
    const dueDate = createDate(dueDateStr, dueTimeStr);

    todoManager.editTask(id, title, description, new Date(dueDate), priority);
    res.status(200).json(todoManager.getTaskById(id));

  } catch (error) {
    
    res.status(500).json({ error: "An uncaught error occurred." });
  }
});

router.patch('/tasks/:id', function(req, res, next) {
  try {
    
    const { id } = req.params;
    const { done } = req.body;

    if (done === undefined) {
      const malformedReq = new Error("Malformed request");
      malformedReq.name = "MalformedRequestError";
      throw malformedReq;
    }
    
    if (done === true) {
      todoManager.markAsDone(id);
    } else {
      todoManager.markAsUndone(id);
    }

    res.status(200).json(todoManager.getTaskById(id));

  } catch (error) {
    
    if (error.name === "MalformedRequestError") {
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
});

module.exports = router;
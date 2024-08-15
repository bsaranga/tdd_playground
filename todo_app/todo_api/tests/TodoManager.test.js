const TodoManager = require('../src/TodoManager');
const TaskRepsository = require('../src/TaskRepository');
const uuid_matcher = require('../extensions/jest_uuidmatcher');

expect.extend(uuid_matcher);

test('Todo manager exists', () => {
    const todoManager = new TodoManager();
    expect(todoManager).toBeDefined()
})

test('Todo manager makes use of task repository', () => {
    const todoManager = new TodoManager(new TaskRepsository());
    expect(todoManager.getAllTasks()).toEqual([])
})

test('Todo manager can add a task from base parameters', () => {
    const todoManager = new TodoManager(new TaskRepsository());
    
    const title = 'this is the name of the task';
    const description = 'this is the description';
    const dueDate = new Date(2024, 8, 15, 5, 55, 0);
    const priority = 'high';

    todoManager.addTask(title, description, dueDate, priority);
    const task = todoManager.getAllTasks()[0];

    expect(task.title).toBe(title);
    expect(task.description).toBe(description);
    expect(task.dueDate).toBe(dueDate);
    expect(task.priority).toBe(priority);
})

test('Each created task has a unique id', () => {
    const todoManager = new TodoManager(new TaskRepsository());
    
    todoManager.addTask('title', 'this is the description', new Date(2024, 8, 15, 5, 55, 0), 'high');
    todoManager.addTask('title', 'this is the description', new Date(2024, 8, 15, 5, 55, 0), 'high');
    
    const tasks = todoManager.getAllTasks();
    expect(tasks[0].id).toBeUUID();
    expect(tasks[1].id).toBeUUID();
    expect(tasks[0].id).not.toBe(tasks[1].id);
})

test('Todo manager can remove a task by id', () => {
    const todoManager = new TodoManager(new TaskRepsository());
    
    todoManager.addTask('title', 'this is the description', new Date(2024, 8, 15, 5, 55, 0), 'high');
    todoManager.addTask('title', 'this is the description', new Date(2024, 8, 15, 5, 55, 0), 'high');
    
    const tasks = todoManager.getAllTasks();
    const id = tasks[0].id;
    todoManager.removeTask(id);
    expect(todoManager.getAllTasks().length).toBe(1);
    expect(todoManager.getAllTasks()[0].id).not.toBe(id);
})

test('Todo manager can edit a task by id', () => {
    const todoManager = new TodoManager(new TaskRepsository());
    
    todoManager.addTask('title', 'this is the description', new Date(2024, 8, 15, 5, 55, 0), 'high');
    todoManager.addTask('title', 'this is the description', new Date(2024, 8, 15, 5, 55, 0), 'high');
    
    const tasks = todoManager.getAllTasks();
    const id = tasks[0].id;
    todoManager.editTask(id, 'new title', 'new description', new Date(2024, 8, 15, 5, 55, 0), 'low');
    expect(todoManager.getAllTasks()[0].title).toBe('new title');
    expect(todoManager.getAllTasks()[0].description).toBe('new description');
    expect(todoManager.getAllTasks()[0].dueDate).toEqual(new Date(2024, 8, 15, 5, 55, 0));
    expect(todoManager.getAllTasks()[0].priority).toBe('low');
})

test('Check if a task is expired', () => {
    const todoManager = new TodoManager(new TaskRepsository());
    
    todoManager.addTask('title', 'this is the description', new Date(2020, 8, 15, 5, 55, 0), 'high');
    todoManager.addTask('title', 'this is the description', new Date(2024, 8, 15, 5, 55, 0), 'high');
    
    const tasks = todoManager.getAllTasks();
    expect(tasks[0].isExpired()).toBe(true);
    expect(tasks[1].isExpired()).toBe(false);
})

test('Todo manager can mark a task as done', () => {
    const todoManager = new TodoManager(new TaskRepsository());
    
    todoManager.addTask('title', 'this is the description', new Date(2020, 8, 15, 5, 55, 0), 'high');
    todoManager.addTask('title', 'this is the description', new Date(2024, 8, 15, 5, 55, 0), 'high');
    
    const tasks = todoManager.getAllTasks();
    todoManager.markAsDone(tasks[0].id);
    expect(todoManager.getAllTasks()[0].isComplete()).toBe(true);
    expect(todoManager.getAllTasks()[1].isComplete()).toBe(false);
});

test('Todo manager can get a task by id', () => {
    const todoManager = new TodoManager(new TaskRepsository());
    
    todoManager.addTask('title', 'this is the description', new Date(2020, 8, 15, 5, 55, 0), 'high');
    todoManager.addTask('title', 'this is the description', new Date(2024, 8, 15, 5, 55, 0), 'high');
    
    const tasks = todoManager.getAllTasks();
    const id = tasks[0].id;
    expect(todoManager.getTaskById(id)).toBe(tasks[0]);
})

test('Todo manager can search for a task by title', () => {
    const todoManager = new TodoManager(new TaskRepsository());
    
    todoManager.addTask('this is a peculiar title', 'this is the description', new Date(2020, 8, 15, 5, 55, 0), 'high');
    todoManager.addTask('title', 'this is the description', new Date(2024, 8, 15, 5, 55, 0), 'high');
    
    const tasks = todoManager.getAllTasks();
    const title = tasks[0].title;
    expect(todoManager.searchTasksByTitle(title)).toEqual([tasks[0]]);

    const partialTitle = 'peculiar';
    expect(todoManager.searchTasksByTitle(partialTitle)).toEqual([tasks[0]]);
})

test('Todo manager can mark a task as undone', () => {
    const todoManager = new TodoManager(new TaskRepsository());
    
    todoManager.addTask('title', 'this is the description', new Date(2020, 8, 15, 5, 55, 0), 'high');
    todoManager.addTask('title', 'this is the description', new Date(2024, 8, 15, 5, 55, 0), 'high');
    
    const tasks = todoManager.getAllTasks();
    todoManager.markAsDone(tasks[0].id);
    todoManager.markAsUndone(tasks[0].id);
    expect(todoManager.getAllTasks()[0].isComplete()).toBe(false);
    expect(todoManager.getAllTasks()[1].isComplete()).toBe(false);
})
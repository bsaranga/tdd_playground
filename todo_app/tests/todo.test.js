import TodoManager from '../src/TodoManager';
import TaskRepsository from '../src/TaskRepository';
import uuid_matcher from '../extensions/jest_uuidmatcher';

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
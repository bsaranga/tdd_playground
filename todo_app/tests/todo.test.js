import Task from '../src/Task';
import TodoManager from '../src/TodoManager';
import TaskRepsository from '../src/TaskRepository';

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
    
    todoManager.addTask('taskName', 'this is the description', new Date(2024, 8, 15, 5, 55, 0), 'high');
    
    const task = new Task('taskName', 'this is the description', new Date(2024, 8, 15, 5, 55, 0), 'high');

    expect(todoManager.getAllTasks()).toContainEqual(task)
})

test('Each created task has a unique id', () => {
    
})
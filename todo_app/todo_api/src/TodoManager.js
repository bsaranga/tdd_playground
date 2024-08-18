const Task = require('./Task');

class TodoManager {
    
    #taskRepository;
    
    constructor(taskRepository) {
        this.#taskRepository = taskRepository;
    }

    getTaskById(id) {
        return this.#taskRepository.getTaskById(id);
    }

    getAllTasks() {
        return this.#taskRepository.getAllTasks();
    }

    addTask(title, description, dueDate, priority) {
        if (this.#taskRepository.existsByTitle(title)) {
            const error = new Error('Task with title already exists');
            error.name = 'TaskAlreadyExistsError';
            throw error;
        }
        this.#taskRepository.addTask(new Task(title, description, dueDate, priority));
    }

    removeTask(id) {
        this.#taskRepository.removeTask(id);
    }

    editTask(id, title, description, dueDate, priority) {
        this.#taskRepository.editTask(id, title, description, dueDate, priority);
    }

    markAsDone(id) {
        this.#taskRepository.markAsDone(id);
    }

    markAsUndone(id) {
        this.#taskRepository.markAsUndone(id);
    }

    searchTasksByTitle(title) {
        return this.#taskRepository.filterByTitle(title);
    }
}

module.exports = TodoManager;
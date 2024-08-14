import Task from "./Task";

export default class TodoManager {
    
    #taskRepository;
    
    constructor(taskRepository) {
        this.#taskRepository = taskRepository;
    }

    getAllTasks() {
        return this.#taskRepository.getAllTasks();
    }

    addTask(title, description, dueDate, priority) {
        this.#taskRepository.addTask(new Task(title, description, dueDate, priority));
    }
}
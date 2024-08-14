export default class TaskRepsository {
    constructor() {
        this.tasks = [];
    }

    getAllTasks() {
        return this.tasks;
    }

    addTask(task) {
        this.tasks.push(task);
    }
}
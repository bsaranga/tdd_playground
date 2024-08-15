class TaskRepsository {
    constructor() {
        this.tasks = [];
    }

    getTaskById(id) {
        return this.tasks.find(task => task.id === id);
    }

    getAllTasks() {
        return this.tasks;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    editTask(id, title, description, dueDate, priority) {
        const task = this.tasks.find(task => task.id === id);
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;
    }

    markAsDone(id) {
        const task = this.tasks.find(task => task.id === id);
        task.done = true;
    }

    markAsUndone(id) {
        const task = this.tasks.find(task => task.id === id);
        task.done = false;
    }

    filterByTitle(title) {
        return this.tasks.filter(task => task.title.toLowerCase().includes(title.toLowerCase()));
    }
}

module.exports = TaskRepsository;
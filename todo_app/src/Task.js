const { v4: uuidv4 } = require('uuid');
const TaskDto = require('./dtos/TaskDto');

class Task {

    constructor(title, description, dueDate, priority) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = false;
    }

    isExpired() {
        return new Date() > this.dueDate;
    }

    isComplete() {
        return this.done;
    }

    toDto() {
        return new TaskDto(this.id, this.title, this.description, this.dueDate, this.priority, this.done);
    }
}

module.exports = Task;
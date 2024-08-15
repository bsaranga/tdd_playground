const { displayFriendlyDate } = require("../utilities/utils");

class TaskDto {
    constructor(id, title, description, dueDate, priority, done) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = displayFriendlyDate(dueDate);
        this.priority = priority;
        this.done = done;
    }
}

module.exports = TaskDto;
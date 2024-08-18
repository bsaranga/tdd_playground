const TodoManager = require('./TodoManager');
const TaskRepository = require('./TaskRepository');

class TodoManagerSingleton {
    instance;

    static getInstance() {
        if (!this.instance) {
            this.instance = new TodoManager(new TaskRepository());
        }
        return this.instance;
    }

    static resetInstance() {
        this.instance = null;
    }
}

module.exports = TodoManagerSingleton;
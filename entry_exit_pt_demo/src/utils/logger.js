class Logger {
    info(message) {
        console.log(`\x1b[34m%s\x1b[0m`, message);
    }

    warning(message) {
        console.log(`\x1b[33m%s\x1b[0m`, message);
    }

    error(message) {
        console.log(`\x1b[31m%s\x1b[0m`, message);
    }
}

module.exports = Logger;
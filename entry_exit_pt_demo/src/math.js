class Math {
    constructor () {
    }

    sumFromString (str) {
        const numbers = str.split('+');
        return numbers.reduce((acc, num) => acc + parseInt(num), 0);
    }
}

module.exports = Math;
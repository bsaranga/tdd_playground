function createDate(date, time) {
    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);
    return new Date(year, month - 1, day, hour, minute, 0);
}

function displayFriendlyDate(date) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    let period = 'AM';

    if (hours > 12) {
        hours -= 12;
        period = 'PM';
    }

    const formattedDate = `${dayOfWeek} ${month} ${day} ${year} at ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
    return formattedDate;
}

module.exports = { createDate, displayFriendlyDate };
const createDate = require('../src/utilities/utils').createDate;
const displayFriendlyDate = require('../src/utilities/utils').displayFriendlyDate;

test('Given a date string and a time string return a date object', () => {
    const date = '2020-08-15';
    const time = '05:55';
    const expected = new Date(2020, 7, 15, 5, 55, 0);
    expect(createDate(date, time)).toEqual(expected);
})

test('Get display friendly date from date object', () => {
    const date = new Date(2024, 7, 15, 17, 55, 0);
    const expected = 'Thu Aug 15 2024 at 05:55 PM';
    expect(displayFriendlyDate(date)).toEqual(expected);
})
function getMonthFromDate(dateString) {
    const date = new Date(dateString.split('/')[2], dateString.split('/')[1] - 1, dateString.split('/')[0]);
    const month = date.getMonth() + 1;
    return month;
}

module.exports = { getMonthFromDate }
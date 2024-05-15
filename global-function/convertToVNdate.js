function convertToVNDate(dateString) {
    console.log('convert...: ', dateString)
    let dateParts = dateString.split("-");
    let timeParts = dateParts[2].split(" ")[1].split(":");
    let dateObject = new Date(
        Date.UTC(
            dateParts[2].split(" ")[0], // year
            dateParts[1] - 1, // month
            dateParts[0], // day
            timeParts[0], // hours
            timeParts[1], // minutes
            timeParts[2] // seconds
        )
    );


    return dateObject;
}


module.exports = {convertToVNDate}
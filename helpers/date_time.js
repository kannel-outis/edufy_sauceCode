// jshint esversion: 6
exports.getDateTime = function () {
    let today = new Date();
    let day = "";
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    day = today.toLocaleDateString("en-US", options);
    return day;
};
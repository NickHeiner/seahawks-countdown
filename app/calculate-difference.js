"use strict";
const moment = require("moment");

function calculateDifference(nextGameDate) {
    const now = moment();
    const gameDate = moment.isMoment(nextGameDate) ? nextGameDate : moment(nextGameDate, "dddd, MMMM Do YYYY, hh:mm a");

    if (gameDate.diff(now) < 0) {
        const err = new Error("There is no game in the future");
        err.nextGameDate = gameDate;
        throw err;
    }

    const difference =  {
        days: gameDate.diff(now, "days")
    };

    difference.hours = gameDate.subtract(difference.days, "days").diff(now, "hours");
    difference.minutes = gameDate.subtract(difference.hours, "hours")
        .diff(now, "minutes");
    difference.seconds = gameDate.subtract(difference.minutes, "minutes")
        .diff(now, "seconds");

    return difference;
}

module.exports = calculateDifference;
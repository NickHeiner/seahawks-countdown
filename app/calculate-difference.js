"use strict";
const moment = require("moment");
const formatCountdown = require("./format-countdown");
const _ = require("lodash");

function calculateDifference(nextGameDate, countdownUnits) {
    const now = moment();
    const gameDate = moment.isMoment(nextGameDate) ?
        nextGameDate :
        moment.tz(nextGameDate, "dddd, MMMM Do YYYY, hh:mm a", "America/Los_Angeles");

    if (gameDate.diff(now) < 0) {
        const err = new Error("There is no game in the future");
        err.nextGameDate = gameDate;
        throw err;
    }

    const allUnits = ["days", "hours", "minutes", "seconds"];
    const firstUnitIndex = _.findIndex(allUnits, unit => unit === countdownUnits);
    const units = _.slice(allUnits, firstUnitIndex);

    const difference =  {};
    difference.days = gameDate.diff(now, "days");
    difference.hours = gameDate.subtract(difference.days, "days").diff(now, "hours");
    difference.minutes = gameDate.subtract(difference.hours, "hours")
        .diff(now, "minutes");
    difference.seconds = gameDate.subtract(difference.minutes, "minutes")
        .diff(now, "seconds");

    return formatCountdown(difference);
}

module.exports = calculateDifference;
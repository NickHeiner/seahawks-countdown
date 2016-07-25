"use strict";
const _ = require("lodash");
const moment = require("moment-timezone");

function getNextGame(games, currentDate) {
    const now = currentDate ? moment.tz(currentDate, "YYYY-MM-DD hh:mm a", "America/Los_Angeles") : undefined; 
    const nextGame =  _.find(games, game => moment.tz(game.date, "YYYY-MM-DD hh:mm a", "America/Los_Angeles")
        .isAfter(now));

    if (!nextGame) {
        const err = new Error("There is no game in the future");
        err.currentDate = currentDate ? currentDate : moment();
        throw err;
    }

    nextGame.formattedDate =
        moment(nextGame.date, "YYYY-MM-DD hh:mm a")
        .format("dddd, MMMM Do YYYY, hh:mm a");
        
    return nextGame;
}

module.exports = getNextGame;
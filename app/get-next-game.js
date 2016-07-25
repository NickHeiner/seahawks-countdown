"use strict";
const _ = require("lodash");
const moment = require("moment-timezone");

function getNextGame(games, currentDate) {
    const now = currentDate ? currentDate : undefined; 
    const nextGame =  _.find(games, game => moment.tz(game.date, "YYYY-MM-DD hh:mm a", "America/Los_Angeles")
        .isAfter(now));
        
    nextGame.formattedDate =
        moment(nextGame.date, "YYYY-MM-DD hh:mm a")
        .format("dddd, MMMM Do YYYY, hh:mm a");

    return nextGame;
}

module.exports = getNextGame;
'use strict';

const Alexa = require('alexa-sdk');
const coreHandlers = require('./core.handlers');
const mixinHandlers = require('../modules/utils').mixinHandlers;
const GAME_STATES = require('../enums').GAME_STATES;
const res = require('../responses');

module.exports = Alexa.CreateStateHandler(GAME_STATES.CHOOSE_BOAT_LOOP, mixinHandlers(coreHandlers, {

  'AMAZON.YesIntent': function() {

    this.handler.state = CHOOSE_MAN.PLAYING;

    res.ask.call(this, res.firstBoatChosen());
  },

  'AMAZON.NoIntent': function() {

    this.handler.state = FIRST_SCENE_BOAT.PLAYING;

    res.ask.call(this, res.firstXebec());
  },

  'AMAZON.HelpIntent': function() {
    res.ask.call(this, res.gameStartHelp());
  },

  Unhandled() {
    res.ask.call(this, res.yesOrNo());
  },

  SessionEndedRequest() {
    console.log(`${GAME_STATES.STOPPED} ended: ${this.event.request.reason}`);
  },
});

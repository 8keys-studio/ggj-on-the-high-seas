'use strict';

const Alexa = require('alexa-sdk');
const coreHandlers = require('./core.handlers');
const mixinHandlers = require('../modules/utils').mixinHandlers;
const GAME_STATES = require('../enums').GAME_STATES;
const res = require('../responses');

module.exports = Alexa.CreateStateHandler(GAME_STATES.FIRST_SCENE, {
  'AMAZON.YesIntent': function() {
    // updates
    this.handler.state = this.attributes.previousState;

    // response
    this.emit(':ask', this.attributes.previousResponse);
  },
  'AMAZON.NoIntent': function() {
    this.emit(':tell', res.goodbye());
  },
  Unhandled() {
    this.emit(':ask', res.yesOrNo());
  },
  SessionEndedRequest() {
    console.log(`${GAME_STATES.STOPPED} ended: ${this.event.request.reason}`);
  },
});

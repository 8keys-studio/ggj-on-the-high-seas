'use strict';

const Alexa = require('alexa-sdk');
const coreHandlers = require('./core.handlers');
const mixinHandlers = require('../modules/utils').mixinHandlers;
const GAME_STATES = require('../enums').GAME_STATES;
const res = require('../responses');

module.exports = Alexa.CreateStateHandler(GAME_STATES.GAME_START, mixinHandlers( {

    'AMAZON.NoIntent': function() {
      res.tell.call(this, res.goodbye());
    },

   'AMAZON.YesIntent': function() {
     // updates
     this.handler.state = FIRST_SCENE.PLAYING;
 
     // response
     res.ask.call(this, res.firstScene()); 
  },

    // 'AMAZON.HelpIntent': function() {
    //   res.ask.call(this, res.firstScene());
    // },
});

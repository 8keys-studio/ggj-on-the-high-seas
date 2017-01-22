'use strict';

var CARD_TITLE = "GGJ";
var globalcurrentEventIndex = 0;
var shipAttack = 0;
var shipDefense = 0;
var shipSpeed = 0;
var playerRP = 0;
var shipHP = 0;
var stormAction1 = "";
var stormAction2 = "";


exports.handler = function (event, context) {

    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

     if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }


};

function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}

function getWelcomeResponse(callback) {
    var intro_text = "Ho There! Greetings Captain!  I’m pleased to make your acquaintance. I’m your first mate, Alexa. A beautiful day for the maiden voyage of our beauteous vessel. The sun is shining, the breeze feels good against the skin.  Which one is she?";
    var question_text =  "Is it the Xebec, a masterful balance of speed and strength? Popluar for a  cargo mission such as ours?";
    var sessionAttributes = {},
        speechOutput = intro_text + question_text,
        shouldEndSession = false,
        currentEventIndex = 0,
        repromptText = question_text;

        sessionAttributes = {
        "speechOutput": speechOutput,
        "repromptText": repromptText,
        "currentEventIndex": 0
    };

    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));

}

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Good bye!", "", true));
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;


    switch (globalcurrentEventIndex) {

        case 0:
            callback(session.attributes,
                handleEvent0(intentName, session, callback));
            break;

        case 1:
            callback(session.attributes,
                handleEvent1(intentName, session, callback));
            break;

        case 2:
            callback(session.attributes,
                handleEvent2(intentName,session, callback));
            break;

        case 3:
            callback(session.attributes,
                handleEvent3(intentName, session, callback));
            break;

        case 4:
            callback(session.attributes,
                handleEvent4(intentName, session, callback));
            break;

        case 5:
            callback(session.attributes,
                handleEvent5(intentName, session, callback));
            break;

        case 6:
            callback(session.attributes,
                handleEvent6(intentName, session, callback));
            break;

        case 7:
            callback(session.attributes,
                handleEvent7(intentName, session, callback));
            break;

        case 8:
            callback(session.attributes,
                handleEvent8(intentName, session, callback));
            break;

        case 9:
            callback(session.attributes,
                handleEvent9(intentName, session, callback));
            break;

        case 10:
            callback(session.attributes,
                handleEvent10(intentName, session, callback));
            break;

        case 11:
            callback(session.attributes,
                handleEvent11(intentName, session, callback));
    }

    
}

function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleEvent200(intentName, session, callback) { 
        var speech
        if ("OutrunIntent" === intentName){
            speech = "Aye aye captain!" + "[Sound effect sail]";

            if (playerRP + shipSpeed > 11){
                globalcurrentEventIndex = 300;
                speech += "Captain, they're using split-shot. They're not trying to sink us,"+ 
                "they're trying to disable us. They must want our cargo." + "[Sound effects crash]" +
                "We're putting up a hell of a fight. I think if we stick with what we're doing we'll succeed." +
                "[sound effects crashing] The Cry of the Rift is retreating! A rousing victory, Sir!" +
                "[sound effect cheering]";
            }else{
                globalcurrentEventIndex = 205;
                speech += "It's not working." + "[Sound effect crash]" + "Captain we should surrender." + 
                "It’s a lost cause. Do you want to surrender?";


        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speech, "", false));
    }
    else if ("BraceIntent" === intentName){
        speech = "Aye aye captain!" + "[Sound effect crash]";
            if (playerRP + shipDefense > 11){
                globalcurrentEventIndex = 300;
                speech += "Captain, they're using split-shot. They're not trying to sink us,"+ 
                "they're trying to disable us. They must want our cargo." + "[Sound effects crash]" +
                "We're putting up a hell of a fight. I think if we stick with what we're doing we'll succeed." +
                "[sound effects crashing] The Cry of the Rift is retreating! A rousing victory, Sir!" +
                "[sound effect cheering]";
            }else{
                globalcurrentEventIndex = 205;
                speech += "It's not working." + "[Sound effect crash]" + "Captain we should surrender." + 
                "It’s a lost cause. Do you want to surrender?";

            

        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speech, "", false));
    }
    else if ("FireIntent" === intentName){
            speech = "Aye aye captain!" + "[Sound effect cannon fire]";
           if (playerRP + shipAttack > 11){
                globalcurrentEventIndex = 300;
                speech += "Captain, they're using split-shot. They're not trying to sink us,"+ 
                "they're trying to disable us. They must want our cargo." + "[Sound effects crash]" +
                "We're putting up a hell of a fight. I think if we stick with what we're doing we'll succeed." +
                "[sound effects crashing] The Cry of the Rift is retreating! A rousing victory, Sir!" +
                "[sound effect cheering]";
            }else{
                globalcurrentEventIndex = 205;
                speech += "It's not working." + "[Sound effect crash]" + "Captain we should surrender." + 
                "It’s a lost cause. Do you want to surrender?";

        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speech, "", false));
    }
    else if ("SurrenderIntent" === intentName){
        //Game over
        //globalcurrentEventIndex = 204;
        callback(session.attributes,
            buildSpeechletResponseWithoutCard("[Sound Sad Music]" + "We're all dying. We're all dead. " + 
                "You're not a very good captain." + "<break time='0.5s'/>" + 
                "Thank you for playing (name of game). You got the It's Kind of Crap ending." , "", true));
    }
}

/*
function handleEvent201(intentName, session, callback) { 
    if (playerRP + shipSpeed > 50){
        globalcurrentEventIndex = 300;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "Captain, they're using split-shot. They're not trying to sink us,"+ 
                "they're trying to disable us. They must want our cargo." + "[Sound effects crash]" +
                "We're putting up a hell of a fight. I think if we stick with what we're doing we'll succeed." +
                "[sound effects crashing] The Cry of the Rift is retreating! A rousing victory, Sir!" +
                "[sound effect cheering]", "", false));
    }
    else{
        globalcurrentEventIndex = 205;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE,"It's not working." + "[Sound effect crash]" + "Captain we should surrender." + 
                "It’s a lost cause. Do you want to surrender?", "", false));
    }
}
*/


function handleEvent205(intentName,session,callback){ 

    if ("AMAZON.YesIntent" === intentName){
        callback(session.attributes,
            buildSpeechletResponseWithoutCard("[Sound Effect Music]" + "We're all dying. We're all dead. " + 
                "You're not a very good captain." + "<break time='0.5s'/>" + 
                "Thank you for playing (name of game). You got the It's Kind of Crap ending.", "", true));
    }
        else if ("AMAZON.NoIntent" === intentName){
        callback(session.attributes,
            buildSpeechletResponseWithoutCard("I'll be with you until the end!" + "[Sound effect shouts]" +
            "<break time='0.5s'/>" + "We're being boarded, Sir! What terrible turn of events." + 
            "We've put up a good fight, and I'll continue to stand by you. At arms sailors! We won't let them take us without a fight!" + 
            "Captain! Look out!" + "[Gun Shot]" + "Captain, my captain, I'm so sorry I can't protect you any longer." +
            "[SAD MUSIC]" + "Please fight on. It's been a pleasure sailing with you." + "<break time='0.5s'/>" + 
            "Thank you for playing (name of game). You got the Dead Bots Tell No Tales ending.", "", true));
    }else{
        globalcurrentEventIndex = 205;
        callback(session.attributes,
        buildSpeechletResponse(CARD_TITLE,"Captain, we need to decide now. Do you want to surrender?", "", false));
    }

}


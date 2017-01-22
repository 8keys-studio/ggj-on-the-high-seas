'use strict';

var CARD_TITLE = "GGJ";
var globalcurrentEventIndex = 0;

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

    // handle yes/no intent after the user has been prompted
    // if (session.attributes && session.attributes.userPromptedToContinue) {
    //     delete session.attributes.userPromptedToContinue;
    //     if ("AMAZON.NoIntent" === intentName) {
    //         handleFinishSessionRequest(intent, session, callback);
    //     } else if ("AMAZON.YesIntent" === intentName) {
    //         handleRepeatRequest(intent, session, callback);
    //     }
    // }

    switch (globalcurrentEventIndex) {

        case 0:
            callback(session.attributes,
                handleEvent0(intentName, session, callback));
            break;

        case 1:
            callback(session.attributes,
                handleEvent1(intentName, session, callback));
            break;

    }

    // if ("AMAZON.NoIntent" === intentName){
    //     callback(session.attributes,
    //     buildSpeechletResponseWithoutCard("Well screw you, then!", "", true));
    // }
    // else if ("AMAZON.YesIntent" === intentName) {
    //     callback(session.attributes,
    //     buildSpeechletResponseWithoutCard("Good, I like that ship!", "", true));
    // }
    // else if ("DontKnowIntent" === intentName) {
    //     callback(session.attributes,
    //         buildSpeechletResponseWithoutCard("Well make up your mind for god's sake!", "", true));
    // }

    // dispatch custom intents to handlers here
    
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

function handleEvent0(intentName, session, callback) {
    if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        globalcurrentEventIndex = 3;
        callback(session.attributes,
            buildSpeechletResponseWithoutCard( "A most glorious choice, my captain. Our crew gathers at last." + 
                "Let me make introductions. This, sir, is our Sailing Master, Carrington. An excellent navigator is he," + 
                "and swiftly gets to the destination. [SM: Good day Captain]  And here is Flockhart, our Boatswain, in" +
                "charge of maintenance and supplies, as well. He knows a ship from bottom to top, and he meets challenges" + 
                "of a voyage. [B: Looking foward to embarkation, Sir.]  And this is our Master Gunner, Bramley. He'll be" + 
                "invaluable should we run into trouble, God help us. [MG: An honor, captain.] A fine crew if ever I saw one" + 
                "Captain. We have a bit of extra time, would you like to talk to one of them a bit more?", "", false));
    }
    else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 1;
        globalcurrentEventIndex = 1;
        callback(session.attributes,
            buildSpeechletResponseWithoutCard("Oh, so you went a different way. Is it that swift brigantine there?" + 
                "Lightly armed, but such speed, and impressive maneuverabity?","", false));
    }
}

function handleEvent1(intentName, session, callback) {
    if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        globalcurrentEventIndex = 3;
        callback(session.attributes,
            buildSpeechletResponseWithoutCard("A most glorious choice, my captain. Our crew gathers at last." + 
                "Let me make introductions. This, sir, is our Sailing Master, Carrington. An excellent navigator is he," + 
                "and swiftly gets to the destination. [SM: Good day Captain]  And here is Flockhart, our Boatswain, in" + 
                "charge of maintenance and supplies, as well. He knows a ship from bottom to top, and he meets challenges" + 
                "of a voyage. [B: Looking foward to embarkation, Sir.]  And this is our Master Gunner, Bramley. He'll be" + 
                "invaluable should we run into trouble, God help us. [MG: An honor, captain.] A fine crew if ever I saw one" + 
                "Captain. We have a bit of extra time, would you like to talk to one of them a bit more?", "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 2;
        callback(session.attributes,
            buildSpeechletResponseWithoutCard("So she's the galleon, massive and built for battle? ","", false));
    }
}
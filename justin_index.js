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

function handleEvent0(intentName, session, callback) { //Xebec?
    if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        globalcurrentEventIndex = 3;
        shipAttack = 1;
        shipSpeed = 1;
        shipDefense = 1;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "A most glorious choice, my captain. Our crew gathers at last." + 
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
            buildSpeechletResponse(CARD_TITLE,"Oh, so you went a different way. Is it that swift brigantine there?" + 
                "Lightly armed, but such speed, and impressive maneuverabity?","", false));
    }
}

function handleEvent1(intentName, session, callback) { //brigantine?
    if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        shipAttack = 0;
        shipDefense = 1;
        shipSpeed = 2;
        globalcurrentEventIndex = 3;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "A most glorious choice, my captain. Our crew gathers at last." + 
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
            buildSpeechletResponse(CARD_TITLE, "So she's the galleon, massive and built for battle?","", false));
    }
}

function handleEvent2(intentName,session,callback) { //galleon?
        if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        shipAttack = 2;
        shipDefense = 1;
        shipSpeed = 0;
        globalcurrentEventIndex = 3;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "A most glorious choice, my captain. Our crew gathers at last." + 
                "Let me make introductions. This, sir, is our Sailing Master, Carrington. An excellent navigator is he," + 
                "and swiftly gets to the destination. [SM: Good day Captain]  And here is Flockhart, our Boatswain, in" + 
                "charge of maintenance and supplies, as well. He knows a ship from bottom to top, and he meets challenges" + 
                "of a voyage. [B: Looking foward to embarkation, Sir.]  And this is our Master Gunner, Bramley. He'll be" + 
                "invaluable should we run into trouble, God help us. [MG: An honor, captain.] A fine crew if ever I saw one" + 
                "Captain. We have a bit of extra time, would you like to talk to one of them a bit more?", "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 0;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "Well surely it's none of these other ramshakle vessels. " +
                "Tell me captain, truly <break time='0.5s'/>" +
                "Is it the Xebec, a masterful balance of speed and strength? Popluar for a  cargo mission such as ours?" ,"", false));
    }

}

function handleEvent3(intentName,session,callback) { //We have a bit of extra time, would you like to talk to one of them a bit more?
        if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        globalcurrentEventIndex = 4;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "Perhaps sailing master Carrington?", "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 7;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "Aye, then let us dally no more. Captain to the deck! <break time='0.5s'/>" +
            "Captain, the crew is ready to set sail. Would you like to inspect the ship further before we depart, or set off immediately?" ,"", false));
    }

}

function handleEvent4(intentName,session,callback){ //"Perhaps sailing master Carrington?"
    if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        globalcurrentEventIndex = 7;
        shipSpeed += 1;
        playerRP += 1;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "[SM AUDIO FILE HERE]" + "<break time='0.5s'/>" + "Captain, the crew is ready to set sail. Would you like to inspect the ship further before we depart, or set off immediately?" , "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 5;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "Then maybe our boatswain, Flockheart." ,"", false));
    }

}

function handleEvent5(intentName,session,callback){ //"Then maybe our boatswain, Flockheart."
    if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        globalcurrentEventIndex = 7;
        shipDefense += 1;
        playerRP += 1;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "[B AUDIO FILE HERE]" + "<break time='0.5s'/>" + "Captain, the crew is ready to set sail. Would you like to inspect the ship further before we depart, or set off immediately?" , "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 6;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "Then surely Gunner Master Bramley?" ,"", false));
    }

}

function handleEvent6(intentName,session,callback){ //"Then surely Gunner Master Bramley?"
    if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        globalcurrentEventIndex = 7;
        shipAttack += 1;
        playerRP += 1;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "[MG AUDIO FILE HERE]" + "<break time='0.5s'/>" + "Captain, the crew is ready to set sail. Would you like to inspect the ship further before we depart, or set off immediately?" , "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 7;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "Aye, then let us dally no more. Captain to the deck! <break time='0.5s'/>" +
            "Captain, the crew is ready to set sail. Would you like to inspect the ship further before we depart, or set off immediately?" ,"", false));
    }

}

function handleEvent7(intentName,session,callback){ //Would you like to inspect the ship further before we depart, or set off immediately?

    var inevtiableEventSpeech = "All is well and underway. According to the manifest, we're carrying 342 chests of tea to port at Boston Harbor. "
                                + "Not very exciting. But anyway, rest assured, you can always ask me the ship's goings on. I've got my ear to the " +
                                "deck. You can ask for the Ship Status, or the Crew Status, and I'll tell you all. But I also recommend getting to know "
                                +"the crew on your own terms. Should I arrange a meeting?";

    if ("InspectIntent" === intentName){
        playerRP += 1;
        globalcurrentEventIndex = 8;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "A wise decision captain, I'm sure we'll find everything in excellent shape. " +
                "As you can see, your crew has been hard at work preparing for our journey. <break time='0.5s'/>" +
                "Just through here are your quarters. I apologize but we haven't been able to remove the skull that the previous owner left behind. " +
                "[soundfile] Yeah yeah, I've already heard your sob story. Don't let him get started Captain you'll never hear the end. " +
                "I'll just throw this tarp over him so he won't bother you anymore. [soundfile] <break time='0.5s'/>" + 
                "That concludes our tour. Captain, it's time to weigh anchor and set sail! <break time='0.5s'/>" + inevtiableEventSpeech, "", false));
    }

    else if ("DepartIntent" ===  intentName){
        playerRP -= 1;
        globalcurrentEventIndex = 8;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, inevtiableEventSpeech, "", false));
    }

}

function handleEvent8(intentName,session,callback){ // ...getting to know the crew on your own terms. Should I arrange a meeting?

    if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        globalcurrentEventIndex = 9;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "Sailing Master Carrington might be a good choice. Would you like to speak with him?" , "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 100;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "Very well then. I'll be in my bunk should you need me. Good evening to you. [WAVE SOUND SCENE CHANGE]" ,"", false));
    }

}

function handleEvent9(intentName,session,callback){ //Sailing Master Carrington might be a good choice. Would you like to speak with him?

    if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        globalcurrentEventIndex = 100;
        shipSpeed += 1;
        playerRP += 1;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "[SM AUDIO FILE] [WAVES] [SCENE CHANGE]" , "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 10;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "What do you say to our boatswain Flockheart. Would you like to speak with him?" ,"", false));
    }

}

function handleEvent10(intentName,session,callback){ //What do you say to our boatswain Flockheart. Would you like to speak with him?

    if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        globalcurrentEventIndex = 100;
        shipDefense += 1;
        playerRP += 1;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "[B AUDIO FILE] [WAVES] [SCENE CHANGE]" , "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 11;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "I can recommend our Gunner Master Bramley. Would you like to speak with him?" ,"", false));
    }

}

function handleEvent11(intentName,session,callback){ //I can recommend our Gunner Master Bramley. Would you like to speak with him?

    if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        globalcurrentEventIndex = 100;
        shipAttack += 1;
        playerRP += 1;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "[GM AUDIO FILE] [WAVES] [SCENE CHANGE]" , "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 100;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, "Very well then. I'll be in my bunk should you need me. Good evening to you. [WAVE SOUND SCENE CHANGE]" ,"", false));
    }

}
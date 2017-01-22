'use strict';

var CARD_TITLE = "GGJ";
var globalcurrentEventIndex = 0;
var shipAttack = 0;
var shipDefense = 0;
var shipSpeed = 0;
var playerRP = 10;
var shipHP = 10;
var stormAction1 = "";
var stormAction2 = "";
var notUnderstood = "I'm sorry, captain. I didn't understand your orders. Let me try again. ";
var notUnderstoodArray = ["Come again, Captain? ", "Speak up, Captain, the waves are loud. ", "Seriously, I didn’t get that. "];
var lastQuestion = "Which one is our ship?  Is it the Xebec, a masterful balance of speed and strength? Popular for a cargo mission such as ours?";

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
    var intro_text = "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/WoodCreakGullWaves.mp3'/>" + "Ahoy there! Greetings Captain!  I’m pleased to make your acquaintance. I’m your first mate, Alexa. It is a beautiful day for the maiden voyage of our seafaring vessel. The sun is shining, the breeze feels good against the skin.";
    var question_text =  "Which one is our ship? Is it the Xebec, a masterful balance of speed and strength? Popular for a cargo mission such as ours?";
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
        buildSSMLSpeechlet(CARD_TITLE, speechOutput, repromptText, shouldEndSession));

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

function buildSSMLSpeechlet (title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "SSML",
            ssml: "<speak>" output + "</speak>"
        },
        card: {
            type: "Simple",
            title: "SessionSpeechlet - " + title,
            content: "SessionSpeechlet - " + output
        },
        reprompt: {
            outputSpeech: {
                type: "SSML",
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
            break;

        case 101:
            callback(session.attributes,
                handleEvent101(intentName, session, callback));
            break;

        case 102:
            callback(session.attributes,
                handleEvent102(intentName, session, callback));
            break;

        case 103:
            callback(session.attributes,
                handleEvent103(intentName, session, callback));
            break;

        case 104:
            callback(session.attributes,
                handleEvent104(intentName, session, callback));

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
        lastQuestion = "We have a bit of extra time, would you like to talk to one of your crew a bit more?";
        // callback(session.attributes,
        //     buildSSMLSpeechlet(CARD_TITLE, "A most glorious choice, my captain. Our crew gathers at last." + 
        //         "Let me make introductions. This, sir, is our Sailing Master, Carrington. An excellent navigator is he," + 
        //         "and swiftly gets to the destination. [insert audio file here]  And here is Flockhart, our Boatswain, in" +
        //         "charge of maintenance and supplies, as well. He knows a ship from bottom to top, and he meets challenges" + 
        //         "of a voyage. [B: Looking foward to embarkation, Sir.]  And this is our Master Gunner, Bramley. He'll be" + 
        //         "invaluable should we run into trouble, God help us. [MG: An honor, captain.] A fine crew if ever I saw one" + 
        //         "Captain. We have a bit of extra time, would you like to talk to one of them a bit more?", "", false));
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "A most glorious choice my captain. Our crew gathers at last. " + 
                "Let me make introductions. This sir is our Sailing Master, Carrington. An excellent navigator is he," + 
                "and swiftly gets to the destination. <audio src='https://s3.amazonaws.com/dead-bots-dialogue/Carrington01-Goodday-CD.mp3'/> And here is Flockheart, our Boatswain, in" +
                "charge of maintenance and supplies. He knows a ship from bottom to top, and he meets the challenges" + 
                "of any voyage. <audio src='https://s3.amazonaws.com/dead-bots-dialogue/Flockhart01-Embark-CD.mp3'/>  And this is our Master Gunner, Bramley. He'll be" + 
                "invaluable should we run into pirate trouble. <audio src='https://s3.amazonaws.com/dead-bots-dialogue/Bramley01-Honor-CD.mp3'/> A fine crew if ever I saw one." + 
                "We have a bit of extra time, would you like to talk to one of your crew a bit more?", "", false));
    }
    else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 1;
        globalcurrentEventIndex = 1;
        lastQuestion = "Is your ship that swift brigantine there?" + "Lightly armed, but such speed, and impressive maneuverability?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE,"Apologies. Is your ship that swift brigantine there?" + 
                "Lightly armed, but such speed, and impressive maneuverability?","", false));
    }

    else {
        var responseNum = Math.floor(Math.random() * 2);
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, notUnderstoodArray[responseNum] + lastQuestion, "", false));
    }
}

function handleEvent1(intentName, session, callback) { //brigantine?
    if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        shipAttack = 0;
        shipDefense = 1;
        shipSpeed = 2;
        globalcurrentEventIndex = 3;
        lastQuestion = "We have a bit of extra time, would you like to talk to one of your crew a bit more?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "A most glorious choice my captain. Our crew gathers at last. " + 
                "Let me make introductions. This sir is our Sailing Master, Carrington. An excellent navigator is he," + 
                "and swiftly gets to the destination. <audio src='https://s3.amazonaws.com/dead-bots-dialogue/Carrington01-Goodday-CD.mp3'/> And here is Flockheart, our Boatswain, in" +
                "charge of maintenance and supplies. He knows a ship from bottom to top, and he meets the challenges" + 
                "of any voyage. <audio src='https://s3.amazonaws.com/dead-bots-dialogue/Flockhart01-Embark-CD.mp3'/>  And this is our Master Gunner, Bramley. He'll be" + 
                "invaluable should we run into pirate trouble. <audio src='https://s3.amazonaws.com/dead-bots-dialogue/Bramley01-Honor-CD.mp3'/> A fine crew if ever I saw one." + 
                "We have a bit of extra time, would you like to talk to one of your crew a bit more?", "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 2;
        lastQuestion = "So your ship is the galleon, massive and built for battle?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "So your ship is the galleon, massive and built for battle?","", false));
    }

    else {
        var responseNum = Math.floor(Math.random() * 2);
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, notUnderstoodArray[responseNum] + lastQuestion, "", false));
    }
}

function handleEvent2(intentName,session,callback) { //galleon?
        if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        shipAttack = 2;
        shipDefense = 1;
        shipSpeed = 0;
        globalcurrentEventIndex = 3;
        lastQuestion = "We have a bit of extra time, would you like to talk to one of the crew a bit more?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "A most glorious choice my captain. Our crew gathers at last. " + 
                "Let me make introductions. This sir is our Sailing Master, Carrington. An excellent navigator is he," + 
                "and swiftly gets to the destination. <audio src='https://s3.amazonaws.com/dead-bots-dialogue/Carrington01-Goodday-CD.mp3'/> And here is Flockheart, our Boatswain, in" +
                "charge of maintenance and supplies. He knows a ship from bottom to top, and he meets the challenges" + 
                "of any voyage. <audio src='https://s3.amazonaws.com/dead-bots-dialogue/Flockhart01-Embark-CD.mp3'/>  And this is our Master Gunner, Bramley. He'll be" + 
                "invaluable should we run into pirate trouble. <audio src='https://s3.amazonaws.com/dead-bots-dialogue/Bramley01-Honor-CD.mp3'/> A fine crew if ever I saw one." + 
                "We have a bit of extra time, would you like to talk to one of your crew a bit more?", "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 0;
        lastQuestion = "Which one is our ship? Is it the Xebec, a masterful balance of speed and strength? Popular for a cargo mission such as ours?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "Well surely it's none of these other ramshackle vessels. " +
                "Tell me captain, truly <break time='0.5s'/>" +
                "Is it the Xebec, a masterful balance of speed and strength? Popular for a cargo mission such as ours?" ,"", false));
    }

    else {
        var responseNum = Math.floor(Math.random() * 2);
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, notUnderstoodArray[responseNum] + lastQuestion, "", false));
    }

}

function handleEvent3(intentName,session,callback) { //We have a bit of extra time, would you like to talk to one of them a bit more?
        if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        globalcurrentEventIndex = 4;
        lastQuestion = "Would you like to speak to sailing master Carrington?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "Perhaps sailing master Carrington?", "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 7;
        lastQuestion = "Would you like to inspect the ship further before we depart, or set off immediately?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "Aye, then let us dally no more. Captain to the deck! <audio src='https://s3.amazonaws.com/dead-bots-dialogue/FoodstepsWaterBell.mp3'/>"  + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Chime-CD.mp3'/>" + " <break time='0.5s'/>" +
            "Captain, the crew is ready to set sail. Would you like to inspect the ship further before we depart, or set off immediately?" ,"", false));
    }

    else {
        var responseNum = Math.floor(Math.random() * 2);
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, notUnderstoodArray[responseNum] + lastQuestion, "", false));
    }


}

function handleEvent4(intentName,session,callback){ //"Perhaps sailing master Carrington?"
    if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        globalcurrentEventIndex = 7;
        shipSpeed += 1;
        playerRP += 1;
        lastQuestion = "Captain, the crew is ready to set sail. Would you like to inspect the ship further before we depart, or set off immediately?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Carrington02-Team-CD.mp3'/>" + "<break time='0.5s'/>" + "Captain, the crew is ready to set sail. Would you like to inspect the ship further before we depart, or set off immediately?" , "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 5;
        lastQuestion = "Would you like to speak to our boatswain, Flockheart?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "Then maybe our boatswain, Flockheart." ,"", false));
    }

    else {
        var responseNum = Math.floor(Math.random() * 2);
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, notUnderstoodArray[responseNum] + lastQuestion, "", false));
    }

}

function handleEvent5(intentName,session,callback){ //"Then maybe our boatswain, Flockheart."
    if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        globalcurrentEventIndex = 7;
        shipDefense += 1;
        playerRP += 1;
        lastQuestion = "Captain, the crew is ready to set sail. Would you like to inspect the ship further before we depart, or set off immediately?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Flockhart02-ShipShape-CD.mp3'/>" + "<break time='0.5s'/>" + "Captain, the crew is ready to set sail. Would you like to inspect the ship further before we depart, or set off immediately?" , "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 6;
        lastQuestion = "Would you like to speak to Gunner Master Bramley?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "Then surely Gunner Master Bramley?" ,"", false));
    }
        else {
        var responseNum = Math.floor(Math.random() * 2);
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, notUnderstoodArray[responseNum] + lastQuestion, "", false));
    }

}

function handleEvent6(intentName,session,callback){ //"Then surely Gunner Master Bramley?"
    if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        globalcurrentEventIndex = 7;
        shipAttack += 1;
        playerRP += 1;
        lastQuestion = "Captain, the crew is ready to set sail. Would you like to inspect the ship further before we depart, or set off immediately?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Bramley02-Danger-CD.mp3'/>" + "<break time='0.5s'/>" + "Captain, the crew is ready to set sail. Would you like to inspect the ship further before we depart, or set off immediately?" , "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 7;
        lastQuestion = "Captain, the crew is ready to set sail. Would you like to inspect the ship further before we depart, or set off immediately?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "Aye, then let us dally no more. Captain to the deck! <audio src='https://s3.amazonaws.com/dead-bots-dialogue/FoodstepsWaterBell.mp3'/>" + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Chime-CD.mp3'/>" + " <break time='0.5s'/>" +
            "Captain, the crew is ready to set sail. Would you like to inspect the ship further before we depart, or set off immediately?" ,"", false));
    }
            else {
        var responseNum = Math.floor(Math.random() * 2);
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, notUnderstoodArray[responseNum] + lastQuestion, "", false));
    }

}

function handleEvent7(intentName,session,callback){ //Would you like to inspect the ship further before we depart, or set off immediately?

    var inevtiableEventSpeech = "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/SettingSail-CD.mp3'/>" + "All is well and underway. According to the manifest, we're carrying 342 chests of tea to port at Boston Harbor. "
                                + "Not very exciting. But anyway, rest assured, you can always ask me the ship's goings on. I've got my ear to the " +
                                "deck. You can ask for the Ship Status, or the Crew Status, and I'll tell you all. But I also recommend getting to know "
                                +"the crew on your own terms. Should I arrange a meeting?";

    if ("InspectIntent" === intentName){
        playerRP += 1;
        globalcurrentEventIndex = 8;
        lastQuestion = "Shall I arrange a meeting with one of your crew members?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "A wise decision captain, I'm sure we'll find everything in excellent shape. " +
                 + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Footstepswood.mp3'/>" + "As you can see, your crew has been hard at work preparing for our journey. <break time='0.5s'/>" +
                "Just through here are your quarters. I apologize but we haven't been able to remove the skull that the previous owner left behind. " +
                "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Skull01-Cursed-CD.mp3'/> Yeah yeah, I've already heard your sob story. Don't let him get started Captain you'll never hear the end. " +
                "I'll just throw this tarp over him so he won't bother you anymore. <audio src='https://s3.amazonaws.com/dead-bots-dialogue/Skull02-Muffled-CD.mp3'/> <break time='0.5s'/>" + 
                "That concludes our tour. Captain, it's time to weigh anchor and set sail! <break time='0.5s'/>" + inevtiableEventSpeech, "", false));
    }

    else if ("DepartIntent" ===  intentName){
        playerRP -= 1;
        globalcurrentEventIndex = 8;
        lastQuestion = "Shall I arrange a meeting with one of your crew members?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, inevtiableEventSpeech, "", false));
    }

    else {
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, notUnderstood + lastQuestion, "", false));
    }

}

function handleEvent8(intentName,session,callback){ // ...getting to know the crew on your own terms. Should I arrange a meeting?

    var speech = "Captain, a storm will be fully upon us soon" + 
                "It's bad and I fear it's only going to get worse." + 
                "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Thunder-CD.mp3'/>" +
                "We won't be able to find a port in time, but we could 'drop anchor'," +
                "'reef the sails', or maybe 'lay ahull and ride it out'" +
                "What say you?";

    if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        globalcurrentEventIndex = 9;
        lastQuestion = "Sailing Master Carrington might be a good choice. Would you like to speak with him?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "Sailing Master Carrington might be a good choice. Would you like to speak with him?" , "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 101;
        lastQuestion = speech;
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "Very well then. I'll be in my bunk should you need me. Good evening to you."  
                + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Waves-CD.mp3'/>" 
                + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Chime-CD.mp3'/>" 
                + speech ,"", false));
    }

    else {
        var responseNum = Math.floor(Math.random() * 2);
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, notUnderstoodArray[responseNum] + lastQuestion, "", false));
    }

}

function handleEvent9(intentName,session,callback){ //Sailing Master Carrington might be a good choice. Would you like to speak with him?

    var speech = "Captain, a storm will be fully upon us soon" + 
                "It's bad and I fear it's only going to get worse." + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Thunder-CD.mp3'/>" +
                "We won't be able to find a port in time, but we could 'drop anchor'," +
                "'reef the sails', or maybe 'lay ahull and ride it out'" +
                "What say you?";

    if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        globalcurrentEventIndex = 101;
        shipSpeed += 1;
        playerRP += 1;
        lastQuestion = speech;
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Carrington03-Time-CD.mp3'/>" 
                + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Waves-CD.mp3'/>" 
                + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Chime-CD.mp3'/>"
                + speech , "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 10;
        lastQuestion = "What do you say to our boatswain Flockheart. Would you like to speak with him?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "What do you say to our boatswain Flockheart. Would you like to speak with him?" ,"", false));
    }
        else {
        var responseNum = Math.floor(Math.random() * 2);
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, notUnderstoodArray[responseNum] + lastQuestion, "", false));
    }

}

function handleEvent10(intentName,session,callback){ //What do you say to our boatswain Flockheart. Would you like to speak with him?

    var speech = "Captain, a storm will be fully upon us soon" + 
                "It's bad and I fear it's only going to get worse." + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Thunder-CD.mp3'/>" +
                "We won't be able to find a port in time, but we could 'drop anchor'," + 
                "'reef the sails', or maybe 'lay ahull and ride it out'" +
                "What say you?";

    if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        globalcurrentEventIndex = 100;
        shipDefense += 1;
        playerRP += 1;
        lastQuestion = speech;
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Flockhart03-Dust-CD.mp3'/>" 
                + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Waves-CD.mp3'/>" 
                + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Chime-CD.mp3'/>" 
                + speech , "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 11;
        lastQuestion = "I can recommend our Gunner Master Bramley. Would you like to speak with him?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "I can recommend our Gunner Master Bramley. Would you like to speak with him?" ,"", false));
    }
            else {
        var responseNum = Math.floor(Math.random() * 2);
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, notUnderstoodArray[responseNum] + lastQuestion, "", false));
    }

}

function handleEvent11(intentName,session,callback){ //I can recommend our Gunner Master Bramley. Would you like to speak with him?

    var yesSpeech = "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Bramley03-Munitions-CD.mp3'/>" 
                + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Waves-CD.mp3'/>" 
                + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Chime-CD.mp3'/>" 
                + " Captain, a storm will be fully upon us soon" + 
                "It's bad and I fear it's only going to get worse."  
                + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Thunder-CD.mp3'/>" +
                "We won't be able to find a port in time, but we could 'drop anchor'," +
                "'reef the sails', or maybe 'lay ahull and ride it out'" +
                "What say you?";

    var noSpeech = "Very well then. I'll be in my bunk should you need me. Good evening to you." 
                + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Waves-CD.mp3'/>" 
                + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Chime-CD.mp3'/>" 
                + " Captain, a storm will be fully upon us soon" + 
                "It's bad and I fear it's only going to get worse." +
                "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Thunder-CD.mp3'/>" +
                "We won't be able to find a port in time, but we could 'drop anchor'," +
                "'reef the sails', or maybe 'lay ahull and ride it out'" +
                "What say you?";

    if ("AMAZON.YesIntent" === intentName){
        // sessionAttributes.currentEventIndex = 3;
        globalcurrentEventIndex = 101;
        shipAttack += 1;
        playerRP += 1;
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, yesSpeech, "", false));
    }
        else if ("AMAZON.NoIntent" === intentName){
        // sessionAttributes.currentEventIndex = 2;
        globalcurrentEventIndex = 101;
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, noSpeech,"", false));
    }

}

function handleEvent101(intentName, session, callback) {
    var speech;
    if ("DropAnchorIntent" === intentName){
        globalcurrentEventIndex = 102;
        stormAction1 = "dropanchor";
        playerRP -= 2;      
        shipHP -= 2;
        
        speech = "Aye aye Captain! Carrington! Aim the bau into the wind! Sailors! Drop anchor!" + 
                "<break time='0.5s'/>" + "The storm is intensifying! I pray that we'll make it through safely!" +
                "<break time='0.5s'/>We could 'Reef the sails', 'heave to', or 'run off downwind'." +
                "What would you have us do now, sir?";
                
        callback(session.attributes,
            buildSpeechletResponseWithoutCard( speech, "", true));
    }
    else if ("ReefSailsIntent" === intentName){
        globalcurrentEventIndex = 102;
        stormAction1 = "reefsails";
        playerRP += 2;
        
        speech = "Aye aye Captain! Carrington! Turn toward the wind! We're reefing the main sail. Sailors! Ease the mainsheet and furl the jib!" + 
                "<break time='0.5s'/> The storm is intensifying! I pray that we'll make it through safely!" +
                "We could 'drop anchor', 'heave to', or 'run off downwind'." +
                "What would you have us do now, sir?";
                
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE,speech,"", false));
    }
    else if ("LayAhull" === intentName){
        globalcurrentEventIndex = 102;
        stormAction1 = "layahull";
        playerRP += 1;      

        speech = "Aye aye Captain! Trim the sails! Batten down the hatches! Carrington, lock the rudder windward!" + 
                "Then get below deck! We're trusting the ship to ride this storm out!" + 
                "<break time='0.5s'/> The storm is intensifying! I pray that we'll make it through safely!" +
                "We could 'drop anchor', 'heave to', or 'run off downwind'." +
                "What would you have us do now, sir?";
                
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE,speech,"", false));
    }else{
        globalcurrentEventIndex = 101;
        speech = "Captain! We can't hear your command over the crashing of the storm!";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE,speech,"", false));
    }
}

function handleEvent102(intentName, session, callback) {
    var speech;
    if ("DropAnchorIntent" === intentName){
        if (stormAction1 == "dropanchor"){
            globalcurrentEventIndex = 102;
            //prevent dupe
            speech = "Captain! Anchors are already down and we are running out of options!" +
            "<break time='0.5s'/>We could 'Reef the sails', 'heave to', or 'run off downwind'." +
            "What would you have us do now, sir?";
        }else{
            globalcurrentEventIndex = 103;
            stormAction2 = "dropanchor";
            playerRP -= 1;      
            shipHP -=1;
                speech = "Aye aye Captain! Carrington! Aim the bau into the wind! Sailors! Drop anchor!" + 
                "<break time='3.5s'/> Well, Captain, we were able to weather the storm." +
                "<break time='1.5s'/> Not too shabby. We only took a little damage and the crew survived. We'll do better next time." +
                "<break time='.5s'/> The men have finished their meals and are on deck having drinks." +
                "They are sure to start singing and dancing soon. Would you like to join them?";
        }
                
        callback(session.attributes,
            buildSpeechletResponseWithoutCard( speech, "", true));
    }
    else if ("ReefSailsIntent" === intentName){
        globalcurrentEventIndex = 103;
        stormAction2 = "dropanchor";
        playerRP -= 1;      
        shipHP -=1;
        
        speech = "Aye aye Captain! Carrington! Turn toward the wind! We're reefing the main sail." +
        "Sailors! Ease the mainsheet and furl the jib!" +
        "<break time='3.5s'/> Well, Captain, we were able to weather the storm.";
        
        if (stormAction1 == "dropanchor"){
            //critical fail
            playerRP -= 1;      
            shipHP -=1;
            speech +=        
                "<break time='1.5s'/>You could have done better out there. Unfortunately, the ship took some damage." +
                "But I'm sure you'll find your sea legs soon enough. The crew was also disappointed, and there were a few minor injuries.";
        }else{
            speech += "<break time='1.5s'/> Not too shabby. We only took a little damage and the crew survived. We'll do better next time.";
        }
        //add time passing sound
        speech += "The men have finished their meals and are on deck having drinks. They are sure to start singing and dancing soon. Would you like to join them?";
         callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE,speech,"", false));
    }
    else if ("HeaveIntent" === intentName){
        globalcurrentEventIndex = 103;
        stormAction2 = "heave";
        playerRP += 1;
        
        speech = "Aye aye Captain! Sailors! Trim the jib aback! Trim the main in hard!" +
        "Carrington! Tack across the wind and aim for 60 degrees off wind! Lash the helm and then get below deck!" +
        "<break time='3.5s'/> Well, Captain, we were able to weather the storm.";
        
        if (stormAction1 == "layahull" || stormAction1 == "reefsails"){
            //solid run
            playerRP += 1;      
            speech += "<break time='1.5s'/> Great work Captain! The ship took no damage, and I think the crew was impressed.";     
        }
        else{
            speech += "<break time='1.5s'/> Not too shabby. We only took a little damage and the crew survived. We'll do better next time.";
        }
        //add time passing sound
        speech += "The men have finished their meals and are on deck having drinks. They are sure to start singing and dancing soon. Would you like to join them?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE,speech,"", false));
    }
    else if ("RunIntent" === intentName){
        globalcurrentEventIndex = 103;
        stormAction2 = "layahull";
        playerRP += 2;
        
        speech = "Aye aye Captain! Sailors! Trim the main sail! And furl the head sail!" +
        "Carrington! Keep the wind and the waves on our stern quarters or directly abaft!" +
        "<break time='3.5s'/> Well, Captain, we were able to weather the storm.";
        
        if (stormAction1 == "reefsails"){
            //perfect run
            playerRP += 1;      
            speech +=  "You were amazing Captain! I was sure that rumors of your skill had been somewhat exaggerated." +
            "But you certainly upheld your reputation. The crew was greatly impressed too!";
        }
        else if (stormAction1 == "layahull"){
            //solid run
            playerRP += 1;      
            speech += "<break time='1.5s'/> Great work Captain! The ship took no damage, and I think the crew was impressed.";            
        }
        else{
            speech += "<break time='1.5s'/> Not too shabby. We only took a little damage and the crew survived. We'll do better next time.";
        }
        //add time passing sound
        speech += "The men have finished their meals and are on deck having drinks. They are sure to start singing and dancing soon. Would you like to join them?";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE,speech,"", false));
    }
    else{
        globalcurrentEventIndex = 102;
        speech = "Captain! We can't hear your command over the crashing of the storm!";
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE,speech,"", false));
    }
}

function handleEvent103(intentName, session, callback) {
    var speech;
    if ("AMAZON.NoIntent" === intentName){
        globalcurrentEventIndex = 200;
        
        speech = "Very good sir. I hope that you rest well.<break time='1.5s'/>Goodnight";
        
        //Add first questions from next chapter
        speech += "";
            callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE,speech,"", false));
    }else if ("AMAZON.YesIntent" === intentName){
        globalcurrentEventIndex = 104;
        playerRP += 1;   
                    
        speech = "I'm sure it will be great fun! I wonder what song they are singing." +
        //add sound clip
        //[Audio File]+
        "<break time='1.5s'/> Oh, it's 'Ten Thousand Miles Away'!" +
        "Shall we sing along?";
        
            callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE,speech,"", false));
    }
}

function handleEvent104(intentName, session, callback) {
    var speech;
    if ("AMAZON.NoIntent" === intentName){
        globalcurrentEventIndex = 200;
        
        speech = "OK. We'll just listen" +
                //add sound clip
        //[Audio File]+
        "That was fun! I suppose we'd best rest for tomorrow. Who knows what the new day will bring. I hope that you rest well Captain." + 
        "Good morning captain. Ah, the calm after the storm. I'm pleased to report We're back on schedule. " + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Carrington04-TheRift-CD.mp3'/>" +
        "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Carrington05-Outrun-CD.mp3'/>" + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Flockhart04-Brace-CD.mp3'/>" +
        "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Bramley04-Strategic-CD.mp3'/>" +
        "What say you captain? Should we prepare to outrun them <break time='.2s'/>  prepare to brace for impact, or position for attack? ";

        //Inert first scene from next chapter
        speech += "";
            callback(session.attributes,
        buildSSMLSpeechlet(CARD_TITLE,speech,"", false));
    }
    else if ("AMAZON.YesIntent" === intentName){
        globalcurrentEventIndex = 200;
        playerRP += 2;   
        //add sound clip
        //speech = [Audio File]+
        speech = "That was so much fun! I suppose we'd best rest for tomorrow. Who knows what the new day will bring. I hope that you rest well Captain." +
        "Good morning captain. Ah, the calm after the storm. I'm pleased to report We're back on schedule. " + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Carrington04-TheRift-CD.mp3'/>" +
        "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Carrington05-Outrun-CD.mp3'/>" + "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Flockhart04-Brace-CD.mp3'/>" +
        "<audio src='https://s3.amazonaws.com/dead-bots-dialogue/Bramley04-Strategic-CD.mp3'/>" +
        "What say you captain? Should we prepare to outrun them <break time='.2s'/>  prepare to brace for impact, or position for attack? ";

        //Inert first scene from next chapter
        speech += "";
        
            callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE,speech,"", false));
    }
    else{
        globalcurrentEventIndex = 104;
                
        speech += "Captain, what do you say? Should we join in?";
            callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE,speech,"", false));
    }
}

function handleEvent200(intentName, session, callback) { 
        var speech;
        if ("OutrunIntent" === intentName){
            speech = "Aye aye captain!" + "[Sound effect sail]";

            if (playerRP + shipSpeed > 11){
                globalcurrentEventIndex = 300;
                speech += "Captain, they're using split-shot. They're not trying to sink us,"+ 
                "they're trying to disable us. They must want our cargo." + "[Sound effects crash]" +
                "We're putting up a hell of a fight. I think if we stick with what we're doing we'll succeed." +
                "[sound effects crashing] The Cry of the Rift is retreating! A rousing victory, Sir!" +
                "[sound effect cheering]";
            }
            else{
                globalcurrentEventIndex = 205;
                speech += "It's not working." + "[Sound effect crash]" + "Captain we should surrender." + 
                "It’s a lost cause. Do you want to surrender?";
            }


        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, speech, "", false));
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
            }
            else{
                globalcurrentEventIndex = 205;
                speech += "It's not working." + "[Sound effect crash]" + "Captain we should surrender." + 
                "It’s a lost cause. Do you want to surrender?";
            }

            

        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, speech, "", false));
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
            }
            else{
                globalcurrentEventIndex = 205;
                speech += "It's not working." + "[Sound effect crash]" + "Captain we should surrender." + 
                "It’s a lost cause. Do you want to surrender?";
            }

        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, speech, "", false));
    }
    else if ("SurrenderIntent" === intentName){
        //Game over
        //globalcurrentEventIndex = 204;
        callback(session.attributes,
            buildSpeechletResponseWithoutCard("[Sound Sad Music]" + "We're all dying. We're all dead. " + 
                "You're not a very good captain." + "<break time='0.5s'/>" + 
                "Thank you for playing Dead Bots Tell No Tales. You got the It's Kind of Crap ending." , "", true));
    }
}

/*
function handleEvent201(intentName, session, callback) { 
    if (playerRP + shipSpeed > 50){
        globalcurrentEventIndex = 300;
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE, "Captain, they're using split-shot. They're not trying to sink us,"+ 
                "they're trying to disable us. They must want our cargo." + "[Sound effects crash]" +
                "We're putting up a hell of a fight. I think if we stick with what we're doing we'll succeed." +
                "[sound effects crashing] The Cry of the Rift is retreating! A rousing victory, Sir!" +
                "[sound effect cheering]", "", false));
    }
    else{
        globalcurrentEventIndex = 205;
        callback(session.attributes,
            buildSSMLSpeechlet(CARD_TITLE,"It's not working." + "[Sound effect crash]" + "Captain we should surrender." + 
                "It’s a lost cause. Do you want to surrender?", "", false));
    }
}
*/


function handleEvent205(intentName,session,callback){ 

    if ("AMAZON.YesIntent" === intentName){
        callback(session.attributes,
            buildSpeechletResponseWithoutCard("[Sound Effect Music]" + "We're all dying. We're all dead. " + 
                "You're not a very good captain." + "<break time='0.5s'/>" + 
                "Thank you for playing Dead Bots Tell No Tales. You got the It's Kind of Crap ending.", "", true));
    }
        else if ("AMAZON.NoIntent" === intentName){
        callback(session.attributes,
            buildSpeechletResponseWithoutCard("I'll be with you until the end!" + "[Sound effect shouts]" +
            "<break time='0.5s'/>" + "We're being boarded, Sir! What terrible turn of events." + 
            "We've put up a good fight, and I'll continue to stand by you. At arms sailors! We won't let them take us without a fight!" + 
            "Captain! Look out!" + "[Gun Shot]" + "Captain, my captain, I'm so sorry I can't protect you any longer." +
            "[SAD MUSIC]" + "Please fight on. It's been a pleasure sailing with you." + "<break time='0.5s'/>" + 
            "Thank you for playing Dead Bots Tell No Tales. You got the Dead Bots Tell No Tales ending.", "", true));
    }else{
        globalcurrentEventIndex = 205;
        callback(session.attributes,
        buildSSMLSpeechlet(CARD_TITLE,"Captain, we need to decide now. Do you want to surrender?", "", false));
    }

}
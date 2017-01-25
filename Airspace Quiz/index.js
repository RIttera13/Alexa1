/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/apache2.0/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This sample shows how to create a simple Trivia skill with a multiple choice format. The skill
 * supports 1 player at a time, and does not support games across sessions.
 */

'use strict';

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least 4 answers, any extras will be shuffled in.
 */
var questions = [
    {
        "what does the acronym, “GUMPS”, stand for?": [
            "Gas, Undercarriage, Mixture, Props, Switches",
            "Gyros, Upholstery, Magnetos, Pumps, Stabilizers",
            "Gear, Undertowe, Master, Pressure, Seatbelts",
            "Generator, Universal-Switch, Magnetic-Heading, Power, Settings"
        ]
    },
    {
        "A standard traffic pattern, uses what direction of turn?": [
            "Left",
            "Right",
            "Clockwise",
            "There is no standard turn"
        ]
    },
    {
        "The standard recommended pattern height, for fixed wing aircraft is?": [
            "1000 AGL",
            "1000 MSL",
            "500 AGL",
            "800 MSL"
        ]
    },
    {
        "Class G airspace is?": [
            "Uncontrolled",
            "special use",
            "Controlled",
            "Off Limits"
        ]
    },
    {
        "Class G airspace beguins at what altitude?": [
            "The Ground",
            "500 Feet AGL",
            "1200 Feet AGL",
            "12,000 Feet AGL"
        ]
    },
    {
        "Class E airspace is?": [
            "Controlled",
            "special use",
            "Uncontrolled",
            "Off Limits"
        ]
    },
    {
        "Class E airspace, begins at what altitude, unless otherwise indicated on charts?": [
            "1200 Feet AGL",
            "500 Feet AGL",
            "The surface",
            "12,000 Feet AGL"
        ]
    },
    {
        "Class E airspace, ends at what altitude, unless otherwise indicated on charts?": [
            "17,999 Feet MSL",
            "18,000 Feet MSL",
            "17,999 Feet AGL",
            "14,500 Feet MSL",
            "18,000 Feet AGL"
        ]
    },
    {
        "Class A airspace, beguins at what altitude?": [
            "18,000 Feet MSL",
            "17,999 Feet MSL",
            "17,999 Feet AGL",
            "14,500 Feet MSL",
            "18,000 Feet AGL"
        ]
    },
    {
        "Class A airspace, ends at what altitude?": [
            "60,000 Feet MSL",
            "60,000 Feet AGL",
            "Outer Space",
            "It Doesn't",
            "59,999 Feet MSL"
        ]
    },
    {
        "What airspace, if any, is above Class A?": [
            "Class E",
            "Class B",
            "None",
            "Class G"
        ]
    },
    {
        "The 5 nautical mile inner ring of Class C airspace, begins at what altitude:": [
            "The Surface",
            "500 Feet MSL",
            "500 Feet AGL",
            "1200 Feet MSL",
            "1200 Feet AGL"
        ]
    },
    {
        "Class C airspace, ends at what altitude?": [
            "4000 Feet AGL",
            "4000 Feet MSL",
            "4500 Feet MSL",
            "14,500 Feet MSL",
            "17,999 Feet MSL"
        ]
    },
    {
        "The 10 nautical mile inner ring of Class B airspace, begins at what altitude:": [
            "The Surface",
            "500 Feet MSL",
            "500 Feet AGL",
            "1200 Feet MSL",
            "1200 Feet AGL"
        ]
    },
    {
        "Class B's 30 nautical mile, outer ‘veil', requires what equipment:": [
            "Transponder with Mode C reporting",
            "Transponder",
            "GPS",
            "NDB",
            "Radio"
        ]
    },
    {
        "Class B airspace, ends at what altitude?": [
            "10,000 Feet MSL",
            "10,000 Feet AGL",
            "4500 Feet MSL",
            "14,500 Feet MSL",
            "17,999 Feet MSL"
        ]
    },
    {
        "Class D airspace, beguins at what altitude?": [
            "The Surface",
            "500 Feet MSL",
            "500 Feet AGL",
            "1200 Feet MSL",
            "1200 Feet AGL"
        ]
    },
    {
        "Class D airspace, ends at what altitude?": [
            "2500 Feet AGL",
            "2500 Feet MSL",
            "4500 Feet MSL",
            "14,500 Feet MSL",
            "17,999 Feet MSL"
        ]
    },    
    {
        "Class D airspace, is generally what diameter?": [
            "4 Knotical Miles",
            "5 Knotical Miles",
            "10 Knotical Miles",
            "1 Knotical Mile",
            "5 Statute Miles"
        ]
    },
    {
        "What is required, to enter Class A airspace?": [
            "Clearance",
            "A Jet",
            "ATP Certification",
            "A Transponder"
        ]
    },
    {
        "What is the speed limit, under 10,000 feet, in class b airspace?": [
            "250 knots indicated",
            "250 knots ground speed",
            "no limit",
            "200 knots"
        ]
    },
    {
        "What is the speed limit, within 4 knotical miles, of class c or d airspace, and at or below 2500 feet AGL?": [
            "200 knots indicated",
            "250 knots ground speed",
            "no limit",
            "250 knots indicated"
        ]
    },
    {
        "What is the recomended speed limit, in the traffic pattern, in class G or E airspace?": [
            "200 knots indicated",
            "250 knots ground speed",
            "no limit",
            "250 knots indicated"
        ]
    },
    {
        "What is, NOT needed, to enter class B airspace?": [
            "A commercial pilots certificate",
            "Transponder with Mode C reporting",
            "ATC Clearance",
            "Two-way radio"
        ]
    },
    {
        "What minimum visibility and cloud clearance, is required for VFR Flight, in Class B airspace?": [
            "3 statute miles visibility, and clear of clouds",
            "3 statute miles visibility, and 500 feet below, 1000 feet above, and 2000 feet horizontally",
            "does not apply",
            "5 statute miles visibility, and 1000 feet below, 1000 feet above, and 1 statute mile horizontally"
        ]
    },
    {
        "What minimum visibility and cloud clearance is required, for VFR Flight, in Class A airspace?": [
            "does not apply",
            "3 statute miles visibility, and clear of clouds",
            "3 statute miles visibility, and 500 feet below, 1000 feet above, and 2000 feet horizontally",
            "5 statute miles visibility, and 1000 feet below, 1000 feet above, and 1 statute mile horizontally"
        ]
    },
    {
        "What minimum visibility and cloud clearance is required, for VFR Flight, in Class C, D, and E airspace, below 10,000 feet MSL?": [
            "3 statute miles visibility, and 500 feet below, 1000 feet above, and 2000 feet horizontally",
            "does not apply",
            "3 statute miles visibility, and clear of clouds",
            "5 statute miles visibility, and 1000 feet below, 1000 feet above, and 1 statute mile horizontally"
        ]
    },
    {
        "What minimum visibility and cloud clearance is required, for VFR Flight, in Class E airspace, above 10,000 feet MSL?": [
            "5 statute miles visibility, and 1000 feet below, 1000 feet above, and 1 statute mile horizontally",
            "3 statute miles visibility, and 500 feet below, 1000 feet above, and 2000 feet horizontally",
            "does not apply",
            "3 statute miles visibility, and clear of clouds"
        ]
    },
    {
        "What minimum visibility and cloud clearance is required, for VFR Flight, in Class G airspace, above 1200 feet AGL, and at or above 10,000 feet MSL?": [
            "5 statute miles visibility, and 1000 feet below, 1000 feet above, and 1 statute mile horizontally",
            "3 statute miles visibility, and 500 feet below, 1000 feet above, and 2000 feet horizontally",
            "does not apply",
            "3 statute miles visibility, and clear of clouds"
        ]
    },
    {
        "What minimum visibility and cloud clearance is required, for VFR Flight, in Class G airspace, above 1200 feet AGL, and below 10,000 feet MSL, at Night?": [
            "3 statute miles visibility, and 500 feet below, 1000 feet above, and 2000 feet horizontally",
            "5 statute miles visibility, and 1000 feet below, 1000 feet above, and 1 statute mile horizontally",
            "does not apply",
            "3 statute miles visibility, and clear of clouds"
        ]
    },
    {
        "What minimum visibility and cloud clearance is required, for VFR Flight, in Class G airspace, above 1200 feet AGL, and below 10,000 feet MSL, during the Day?": [
            "1 statute miles visibility, and 500 feet below, 1000 feet above, and 2000 feet horizontally",
            "3 statute miles visibility, and 500 feet below, 1000 feet above, and 2000 feet horizontally",
            "5 statute miles visibility, and 1000 feet below, 1000 feet above, and 1 statute mile horizontally",
            "does not apply",
            "3 statute miles visibility, and clear of clouds"
        ]
    },
    {
        "What minimum visibility and cloud clearance is required, for VFR Flight, in Class G airspace, below 1200 feet AGL, during the Day?": [
            "1 statute miles visibility, and clear of clouds",
            "1 statute miles visibility, and 500 feet below, 1000 feet above, and 2000 feet horizontally",
            "3 statute miles visibility, and 500 feet below, 1000 feet above, and 2000 feet horizontally",
            "does not apply",
            "3 statute miles visibility, and clear of clouds"
        ]
    },
    {
        "What minimum visibility and cloud clearance is required, for VFR Flight, in Class G airspace, below 1200 feet AGL, at Night?": [
            "3 statute miles visibility, and 500 feet below, 1000 feet above, and 2000 feet horizontally",
            "1 statute miles visibility, and clear of clouds",
            "1 statute miles visibility, and 500 feet below, 1000 feet above, and 2000 feet horizontally",
            "does not apply",
            "3 statute miles visibility, and clear of clouds"
        ]
    },
    {
        "How fast can a reindeer run?": [
            "48 miles per hour",
            "17 miles per hour",
            "19 miles per hour",
            "14 miles per hour"
        ]
    },
    {
        "What is required, to enter class C airspace?": [
            "Established Two-way radio communication",
            "A commercial pilots certificate",
            "NDB",
            "ATC Clearance"
        ]
    }
];

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

//     if (event.session.application.applicationId !== "amzn1.ask.skill.34afe7d5-3b53-4ff0-893e-80ffdfecf895") {
//         context.fail("Invalid Application ID");
//      }

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

/**
 * Called when the session starts.
 */
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

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

// ------- Skill specific business logic -------

var ANSWER_COUNT = 4;
var GAME_LENGTH = 5;
var CARD_TITLE = "Trivia"; // Be sure to change this for your skill.

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = "I will ask you " + GAME_LENGTH.toString()
            + " questions, try to get as many right as you can. Just say the number of the answer. Let's begin. ",
        shouldEndSession = false,

        gameQuestions = populateGameQuestions(),
        correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT)), // Generate a random index for the correct answer, from 0 to 3
        roundAnswers = populateRoundAnswers(gameQuestions, 0, correctAnswerIndex),

        currentQuestionIndex = 0,
        spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0],
        repromptText = "Question 1. " + spokenQuestion + " ",

        i, j;

    for (i = 0; i < ANSWER_COUNT; i++) {
        repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
    }
    speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "correctAnswerIndex": correctAnswerIndex + 1,
        "questions": gameQuestions,
        "score": 0,
        "correctAnswerText":
            questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function populateGameQuestions() {
    var gameQuestions = [];
    var indexList = [];
    var index = questions.length;

    if (GAME_LENGTH > index){
        throw "Invalid Game Length.";
    }

    for (var i = 0; i < questions.length; i++){
        indexList.push(i);
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (var j = 0; j < GAME_LENGTH; j++){
        var rand = Math.floor(Math.random() * index);
        index -= 1;

        var temp = indexList[index];
        indexList[index] = indexList[rand];
        indexList[rand] = temp;
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
}

function populateRoundAnswers(gameQuestionIndexes, correctAnswerIndex, correctAnswerTargetLocation) {
    // Get the answers for a given question, and place the correct answer at the spot marked by the
    // correctAnswerTargetLocation variable. Note that you can have as many answers as you want but
    // only ANSWER_COUNT will be selected.
    var answers = [],
        answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
        temp, i;

    var index = answersCopy.length;

    if (index < ANSWER_COUNT){
        throw "Not enough answers for question.";
    }

    // Shuffle the answers, excluding the first element.
    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        var temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

    // Swap the correct answer into the target location
    for (i = 0; i < ANSWER_COUNT; i++) {
        answers[i] = answersCopy[i];
    }
    temp = answers[0];
    answers[0] = answers[correctAnswerTargetLocation];
    answers[correctAnswerTargetLocation] = temp;
    return answers;
}

function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
    var answerSlotValid = isAnswerSlotValid(intent);
    var userGaveUp = intent.name === "DontKnowIntent";

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
    } else if (!answerSlotValid && !userGaveUp) {
        // If the user provided answer isn't a number > 0 and < ANSWER_COUNT,
        // return an error message to the user. Remember to guide the user into providing correct values.
        var reprompt = session.attributes.speechOutput;
        var speechOutput = "Your answer must be a number between 1 and " + ANSWER_COUNT + ". " + reprompt;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, false));
    } else {
        var gameQuestions = session.attributes.questions,
            correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            correctAnswerText = session.attributes.correctAnswerText;

        var speechOutputAnalysis = "";

        if (answerSlotValid && parseInt(intent.slots.Answer.value) == correctAnswerIndex) {
            currentScore++;
            speechOutputAnalysis = "correct. ";
        } else {
            if (!userGaveUp) {
                speechOutputAnalysis = "wrong. "
            }
            speechOutputAnalysis += "The correct answer is " + correctAnswerIndex + ": " + correctAnswerText + ". ";
        }
        // if currentQuestionIndex is 4, we've reached 5 questions (zero-indexed) and can exit the game session
        if (currentQuestionIndex == GAME_LENGTH - 1) {
            speechOutput = userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                + GAME_LENGTH.toString() + " questions correct. Thank you for playing!";
            callback(session.attributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, "", true));
        } else {
            currentQuestionIndex += 1;
            var spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0];
            // Generate a random index for the correct answer, from 0 to 3
            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
            var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),

                questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText = "Question " + questionIndexForSpeech.toString() + ". " + spokenQuestion + " ";
            for (var i = 0; i < ANSWER_COUNT; i++) {
                repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
            }
            speechOutput += userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "Your score is " + currentScore.toString() + ". " + repromptText;

            sessionAttributes = {
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "correctAnswerIndex": correctAnswerIndex + 1,
                "questions": gameQuestions,
                "score": currentScore,
                "correctAnswerText":
                    questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
            };
            callback(sessionAttributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, false));
        }
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

function handleGetHelpRequest(intent, session, callback) {
    // Provide a help prompt for the user, explaining how the game is played. Then, continue the game
    // if there is one in progress, or provide the option to start another one.
    
    // Ensure that session.attributes has been initialized
    if (!session.attributes) {
        session.attributes = {};
    }

    // Set a flag to track that we're in the Help state.
    session.attributes.userPromptedToContinue = true;

    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.

    var speechOutput = "I will ask you " + GAME_LENGTH + " multiple choice questions. Respond with the number of the answer. "
        + "For example, say one, two, three, or four. To start a new game at any time, say, start game. "
        + "To repeat the last question, say, repeat. "
        + "Would you like to keep playing?",
        repromptText = "To give an answer to a question, respond with the number of the answer . "
        + "Would you like to keep playing?";
        var shouldEndSession = false;
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Good bye!", "", true));
}

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return answerSlotIsInt && parseInt(intent.slots.Answer.value) < (ANSWER_COUNT + 1) && parseInt(intent.slots.Answer.value) > 0;
}

// ------- Helper functions to build responses -------


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

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}


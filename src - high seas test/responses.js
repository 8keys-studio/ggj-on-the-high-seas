/* eslint-ignore max-len */

'use strict';

module.exports.firstScene = () =>
	'Ahoy there! Greetings Captain!  I’m pleased to make your acquaintance. I’m your first mate, Alexa. It is a beautiful day for the maiden voyage of our seafaring vessel. The sun is shining, the breeze feels good against the skin. Which one is our ship?  Is it the Xebec, a masterful balance of speed and strength? Popular for a cargo mission such as ours?';

mobile.exports.firstXebec = () => 
	'Which one is our ship?  Is it the Xebec, a masterful balance of speed and strength? Popular for a cargo mission such as ours?';

module.exports.firstBrigandier = () =>
	'Apologies. Is it that swift brigantine there? Lightly armed, but such speed, and impressive maneuverability?';

module.exports.firstGalleon = () =>
 	'So she's the galleon, massive and built for battle? ';

module.exports.firstBoatNotChosen = () =>
	'Well surely it's none of these other ramshakle vessels. Tell me captain, truly.';

module.exports.firstBoatChosen = () =>
	'A most glorious choice my captain. Our crew gathers at last. Let me make introductions. This sir is our Sailing Master, Carrington. An excellent navigator is he, and swiftly gets to the destination. [SM: Good day Captain]  And here is Flockhart, our Boatswain, in charge of maintenance and supplies. He knows a ship from bottom to top, and he meets the challenges of any voyage. [B: Looking foward to embarkation, Sir.]  And this is our Master Gunner, Bramley. He'll be invaluable should we run into pirate trouble. [MG: An honor, captain.] A fine crew if ever I saw one. We have a bit of extra time, would you like to talk to one of your crew a bit more?';

module.exports.firstTalkCarrington = () =>
	'Perhaps sailing master Carrington? ';

module.exports.firstTalkFlockhart = () =>
	'Then maybe our boatswain, Flockheart.';

module.exports.firstTalkBramley = () =>
	'Then surely Gunner Master Bramley?';

module.exports.firstTalkNoOne = () =>
	'Aye, then let us dally no more. Captain to the deck!';	

module.exports.firstCheckShip = () =>
	'Captain, the crew is ready to set sail. Would you like to inspect the ship further before we depart, or set off immediately?';

module.exports.firstCheckShip = () =>
	'A wise decision captain, I'm sure we'll find everything in excellent shape. As you can see, your crew has been hard at work preparing for our journey.';

module.exports.firstCheckQuarters = () =>
	'Just through here are your quarters. I apologize but we haven't been able to remove the skull that the previous owner left behind. [soundfile] Yeah yeah, I've already heard your sob story. Don't let him get started Captain you'll never hear the end. I'll just throw this tarp over him so he won't bother you anymore. [soundfile]';

module.exports.firstNoCheck = () =>
	'Very well Captain, we will weigh anchor and set sail immediately.';

module.exports.firstCheckFinished = () =>
	'That concludes our tour. Captain, it's time to weigh anchor and set sail!';

module.exports.firstUnderway = () =>
	'All is well and underway. According to the manifest, we're carrying 342 chests of tea to port at Boston Harbor. Not very exciting. But anyway, rest assured, you can always ask me the ship's goings on. I've got my ear to the deck. You can ask for the Ship Status, or the Crew Status, and I'll tell you all. But I also recommend getting to know the crew on your own terms. Should I arrange a meeting?';

module.exports.firstNoMeeting = () =>
	'Very well then. I'll be in my bunk should you need me. Good evening to you.';

module.exports.firstMeetCarrington = () =>
	'Sailing Master Carrington might be a good choice. Would you like to speak with him?';

// module.exports.firstCarringtonTalk = () =>
// 	'Evening captain. We're making great time. Perhaps this is my chance to break my previous record. My thanks to you for staying out of my way (LAUGH). Off you go. Goodnight.';

module.exports.firstMeetFlockheart = () =>
	'What do you say to our boatswain Flockheart. Would you like to speak with him?';

// module.exports.firstFlockheartTalk = () =>
// 	'Evening Captain. I'm glad I ran into you. I thought you should know I detected a mild coating of dust on the skull in your quarters -- but not to worry. I've polished it dilligently. And I noticed one of your pictures was crooked. So I straightened it -- rest easy sir. Goodnight.';

module.exports.firstMeetBramley = () =>
	'I can recommend our Gunner Master Bramley. Would you like to speak with him?';

// module.exports.firstBramleyTalk = () =>
// 	'Evening captain. All's well on the open seas tonight. Unfortunately so, I say. I do long to pack the cannons on long sorts of trips like these. Don't worry yourself though. This route's tried and true. Well, I'll be below deck perusing the munitions. Goodnight to you, cap.';






module.exports.firstMeetFlockheart = () =>
	'What do you say to our boatswain, Flockheart? ';

module.exports.firstMeetFlockheart = () =>
	'What do you say to our boatswain, Flockheart? ';





module.exports.keepGoing = () =>
	'Would you like to keep going?';

module.exports.goodbye = () =>
	'Ok, see you soon.';

module.exports.yesOrNo = () =>
	'So is that a yes or a no...?';

module.exports.gameStartHelp = () =>
	'How to play the game';

module.exports.ask = function(sayWhat, continuation) {
  // updates
  this.attributes.previousState = this.handler.state;
  this.attributes.previousResponse = continuation || sayWhat;

  // response
  this.emit(':ask', sayWhat);
};

module.exports.tell = function(tellWhat) {
  this.emit(':tell', tellWhat);
};


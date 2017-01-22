/* eslint-ignore max-len */

'use strict';

module.exports.firstScene = () =>
	'Ho There! Greetings Captain!  I’m pleased to make your acquaintance. I’m your first mate, Alexa. A beautiful day for the maiden voyage of our beauteous vessel. The sun is shining, the breeze feels good against the skin.';

mobile.exports.firstXebec = () => 
	'Which one is she?  Is it the Xebec, a masterful balance of speed and strength? Popluar for a  cargo mission such as ours?';

module.exports.firstBrigandier = () =>
	'Oh, so you went a different way. Is it that swift brigantine there? Lighly armed, but such speed, and impressive maneuverabity?';

module.exports.firstGalleon = () =>
 	'So she's the galleon, massive and built for battle? ';

module.exports.firstBoatNotChosen = () =>
	'Well surely it's none of these other ramshakle vessels. Tell me captain, truly.'

module.exports.firstBoatChosen = () =>
	'A most glorious choice, my captain. Our crew gathers at last. Let me make introductions. This, sir, is our Sailing Master, Carrington. An excellent navigator is he, and swiftly gets to the destination. [SM: Good day Captain]  And here is Flockhart, our Boatswain, in charge of maintenance and supplies, as well. He knows a ship from bottom to top, and he meets challenges of a voyage. [B: Looking foward to embarkation, Sir.]  And this is our Master Gunner, Bramley. He'll be invaluable should we run into trouble, God help us. [MG: An honor, captain.] A fine crew if ever I saw one Captain. We have a bit of extra time, would you like to talk to one of them a bit more? ';

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


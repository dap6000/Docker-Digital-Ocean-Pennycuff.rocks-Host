console.log('start');
$(document).ready(function() {
'use strict';

function rnd(n) { return Math.floor(Math.random() * (n - 1)) + 1; }

function print(str) {
	$('#game').append(str);
	$('#game').append('<br>');
	window.scrollTo(0,document.body.scrollHeight);
}

$('#input').submit(function(e) {
	console.log('Text: ' + $('[name=command]').val().toLowerCase());
	var a$ = ($('[name=command]').val().toLowerCase());
	$('[name=command]').val('');
	$('#game').append('<b>' + a$.toUpperCase() + '</b><br>');
	window.scrollTo(0,document.body.scrollHeight);
	processCommand(a$);
	return false;
});

// 6000 - 6999	Word table
var words = {
	'orc': { verb: false, extra: 0, object: 0 },
	'jewel': { verb: false, extra: 0, object: 1 },
	'crown': { verb: false, extra: 0, object: 1 },
	'golde': { verb: false, extra: 0, object: 2 },
	'cube': { verb: false, extra: 0, object: 2 },
	'diamo': { verb: false, extra: 0, object: 3 },
	'beetl': { verb: false, extra: 0, object: 3 },
	'silve': { verb: false, extra: 0, object: 4 },
	'belt': { verb: false, extra: 0, object: 4 },
	'plati': { verb: false, extra: 0, object: 5 },
	'ring': { verb: false, extra: 0, object: 5 },
	'onyx': { verb: false, extra: 0, object: 6 },
	'coin': { verb: false, extra: 0, object: 7 },
	'hourg': { verb: false, extra: 0, object: 8 },
	'torch': { verb: false, extra: 0, object: 9 },
	'axe': { verb: false, extra: 0, object: 10 },
	'key': { verb: false, extra: 0, object: 11 },
	'grena': { verb: false, extra: 0, object: 12 },
	'manti': { verb: false, extra: 0, object: 13 },
	'iguan': { verb: false, extra: 0, object: 14 },
	'spide': { verb: false, extra: 0, object: 15 },
	'namel': { verb: false, extra: 0, object: 16 },
	'terro': { verb: false, extra: 0, object: 16 },
	'ooze': { verb: false, extra: 0, object: 17 },
	'desks': { verb: false, extra: 0, object: 17 },
	'cabin': { verb: false, extra: 0, object: 17 },
	'bodie': { verb: false, extra: 0, object: 17 },
	'coke': { verb: false, extra: 0, object: 17 },
	'machi': { verb: false, extra: 0, object: 17 },
	'cobwe': { verb: false, extra: 0, object: 17 },
	'cases': { verb: false, extra: 0, object: 17 },
	'coffi': { verb: false, extra: 0, object: 17 },
	'door': { verb: false, extra: 3, object: 17 },
	'grate': { verb: false, extra: 2, object: 17 },

	'u': { verb: true, direction: 'up', handler: 'move' },
	'd': { verb: true, direction: 'down', handler: 'move' },
	'n': { verb: true, direction: 'north', handler: 'move' },
	'ne': { verb: true, direction: 'ne', handler: 'move' },
	'e': { verb: true, direction: 'east', handler: 'move' },
	'se': { verb: true, direction: 'se', handler: 'move' },
	's': { verb: true, direction: 'south', handler: 'move' },
	'sw': { verb: true, direction: 'sw', handler: 'move' },
	'w': { verb: true, direction: 'west', handler: 'move' },
	'nw': { verb: true, direction: 'nw', handler: 'move' },
	'north': { verb: true, direction: 'north', handler: 'move' },
	'south': { verb: true, direction: 'south', handler: 'move' },
	'east': { verb: true, direction: 'east', handler: 'move' },
	'west': { verb: true, direction: 'west', handler: 'move' },
	'up': { verb: true, direction: 'up', handler: 'move' },
	'down': { verb: true, direction: 'down', handler: 'move' },

	'score': { verb: true, handler: 'score' },
	'quit': { verb: true, handler: 'quit' },
	'kill': { verb: true, handler: 'fight' },
	'fight': { verb: true, handler: 'fight' },
	'slay': { verb: true, handler: 'fight' },
	'blow': { verb: true, handler: 'bomb' },
	'bomb': { verb: true, handler: 'bomb' },
	'wait': { verb: true, message: 37, handler: 'quip_at_player' },
	'help': { verb: true, message: 36, handler: 'quip_at_player' },
	'read': { verb: true, handler: 'read' },
	'say': { verb: true, handler: 'say' },
	'lock': { verb: true, handler: 'close' },
	'unloc': { verb: true, handler: 'open' },
	'open': { verb: true, handler: 'open' },
	'shut': { verb: true, handler: 'close' },
	'close': { verb: true, handler: 'close' },
	'look': { verb: true, handler: 'look' },
	'inven': { verb: true, handler: 'inventory' },
	'take': { verb: true, handler: 'take' },
	'drop': { verb: true, handler: 'drop' }, // 6005
	'throw': { verb: true, handler: 'drop' },
	'steal': { verb: true, handler: 'take' }, 
	'in': { verb: true, handler: 'implicit_move' },
	'out': { verb: true, handler: 'implicit_move' },
	'go': { verb: true, handler: 'implicit_move' },
	'enter': { verb: true, handler: 'implicit_move' },
	'exit': { verb: true, handler: 'implicit_move' },
	'save': { verb: true, handler: 'save' },
	'resto': { verb: true, handler: 'restore' },
	'aardv': { verb: true, handler: 'aardvark' }
};

// 7000 - 7999	Message block
var messages = [
	"The creature will not let you pass!", // 7000
	"The grate is closed and locked!", // 7001
	"The door is tightly shut and locked!", // 7002
	"You fall to your doom...", // 7004
	"You can't go that way.", // 7005
	"What did you say?", // 7006
	"You try unsuccessfully... immovable!", // 7007
	"You already have it!", // 7008
	"You don't have it!", // 7009
	"Okay.", // 7010
	"I see nothing of the sort here.", // 7011
	"You don't need to.", // 7012
	"With a creak, the grate falls open.", // 7013
	"The door swings open wide.", // 7014
	"You have no key!", // 7015
	"It slams shut and the lock catches.", // 7016
	"You have the following:", // 7017
	"Prepare tape recorder and hit &lt;enter>.", // 7018
	"You have no bomb!", // 7019
	"The grenade falls to the floor and nothing happens.", // 7020
	"The grenade explodes in a slient flash of weird blue light... and the creature is gone!", // 7021
	"With what weapon?", // 7022
	"Your axe swings are dynamic... but ineffective!", // 7023
	"Your magic axe connects! The creature vanishes in a puff of foul smoke", // 7024
	"Missed it! Fie!", // 7025
	"The hideous monster leaps at your throat!", // 7026
	"Somehow you fend it off!", // 7027
	"It finishes you off!!", // 7028
	"Your score is:", // 7029
	"Do visit the basement again!", // 7030
	"Nothing here to read... how dull!", // 7031
	"The danger here / is pretty thick, / but say <Aardvark>; / You'll get out quick!", // 7032
	"Nothing happens.", // 7033
	"Well, fine adventurer! You are in a real jam! Fortunately, we can bring you back! ...POOF!!...", // 7034
	"Your arms are full... you can carry no more.", // 7035
	"Your cries go unheard, pitiful wretch.", // 7036
	"Time passes...", // 7037
	"It is pitch dark! You may fall into a pit!", // 7038
	"You manifest some pretty suicidal tendencies, fella!", // 7039
	"Save your stamina, turkey! I see no real threat!", // 7040
	"He swings at you with a black scimitar!", // 7042
	"You are slashed in pieces." // 7043
];

var rooms = [
	{ travel: { north: 0, ne: 1, east: 1, se: 0, south: 0, sw: 0, west: 0, nw: 0, up: -1, down: 2, implicit: 'down' }, // 5000 rm 0
		desc: { full: "You stand at the bottom of a large pit. At your feet is a narrow hole just wide enough to crawl\
				into.",
			brief: "Bottom of pit." },
		underground: false,
		visited: false
	},
	{ travel: { north: 1, ne: 1, east: 1, se: 1, south: 1, sw: 0, west: 0, nw: 1, up: -1, down: 7, implicit: 'down' }, // 5002 rm 1
		desc: { full: "Here are the ruins of an ancient troll-castle. Nearby is a grate leading down into darkness...",
			brief: "Ruins." },
		underground: false,
		visited: false
	},
	{ travel: { north: -1, ne: -1, east: 3, se: 9, south: -1, sw: -1, west: -1, nw: -1, up: 0, down: -1, implicit: 'up' }, // 5004 rm 2
		desc: { full: "This was apparently once a weapons room, though the cases are all empty now. There's a hole in\
				the roof, an archway to the east, and a jagged hole in the southeast wall.",
			brief: "Weapons room." },
		underground: true,
		visited: false
	},
	{ travel: { north: -1, ne: 4, east: -1, se: -1, south: 10, sw: -1, west: 2, nw: -1, up: -1, down: -1, implicit: 'south' }, // 5006 rm 3
		desc: { full: "The signs of a great battle between trolls and terrible beast-men are evident... from the looks\
				of it, the trolls lost. Bodies are everywhere. There is a jagged hole to the west, a hall northeast, and a\
				south door.",
			brief: "Lost battle." },
		underground: true,
		visited: false
	},
	{ travel: { north: -1, ne: -1, east: -1, se: -1, south: -1, sw: 3, west: -1, nw: -1, up: -1, down: -1, implicit: 'sw' }, // 5008 rm 4
		desc: { full: "The halls are lined with coffin cases... this is the troll cementery, it seems. A southwest\
				door leads out.",
			brief: "Tomb room."},
		underground: true,
		visited: false
	},
	{ travel: { north: -1, ne: -1, east: -1, se: 11, south: -1, sw: -1, west: -1, nw: -1, up: -1, down: 23, implicit: 'se' }, // 5010 rm 5
		desc: { full: "This is a small, dark room smelling of magic. The oracle has left a message on the wall. There\
				is a southeast door and a large pit near the door.",
			brief: "Oracle room." },
		underground: true,
		visited: false
	},
	{ travel: { north: -1, ne: -1, east: -1, se: 13, south: -1, sw: -1, west: -1, nw: -1, up: -1, down: -1, implicit: 'up' }, // 5012 rm 6
		desc: { full: "At last! The treasure vault! What a shame that so much of the original wealth has been\
				removed! There is a southeast door out.",
			brief: "Treasure vault." },
		underground: true,
		visited: false
	},
	{ travel: { north: -1, ne: -1, east: -1, se: -1, south: 13, sw: -1, west: -1, nw: -1, up: 1, down: -1, implicit: 'up' }, // 5014 rm 7
		desc: { full: "This was once the main guardpost to the underground kingdom of the trolls. There is an\
				entrance-grate set in the roof and a south exit door.",
			brief: "Guard post." },
		underground: true,
		visited: false
	},
	{ travel: { north: 8, ne: -1, east: 15, se: 14, south: 8, sw: -1, west: -1, nw: 8, up: -1, down: -1, implicit: 'nw' }, // 5016 rm 8
		desc: { full: "You are lost in a maze!", brief: "You are lost in a maze!" },
		underground: true,
		visited: false
	},
	{ travel: { north: 23, ne: 23, east: 23, se: 15, south: 16, sw: 16, west: 16, nw: 2, up: -1, down: 16, implicit: 'south' }, // 5018 rm 9
		desc: { full: "You walk along a narrow ledge running running northwest and southeast. To the west is a rapid stream\
				far below, and to the east is a bottomless chasm!",
			brief: "Narrow ledge." },
		underground: true,
		visited: false
	},
	{ travel: { north: 3, ne: -1, east: -1, se: -1, south: -1, sw: -1, west: -1, nw: -1, up: -1, down: -1, implicit: 'north' }, // 5020 rm 10
		desc: { full: "This is a small prison cell. Through the bars, you can see a nice office... unreachable. Theres a\
				north door.",
			brief: "Cell." },
		underground: true,
		visited: false
	},
	{ travel: { north: -1, ne: -1, east: 12, se: -1, south: 17, sw: -1, west: -1, nw: 5, up: -1, down: -1, implicit: 'nw' }, // 5022 rm 11
		desc: { full: "Here is a business office, with empty ransacked desks and cabinets. A barred window in the wall\
				shows a small prison cell of some sort. There are two doors, to the northwest and east, and a rocky\
				hole in the south wall.",
			brief: "Office." },
		underground: true,
		visited: false
	},
	{ travel: { north: -1, ne: -1, east: -1, se: -1, south: -1, sw: -1, west: 11, nw: -1, up: -1, down: -1, implicit: 'west' }, // 5024 rm 12
		desc: { full: "This is the lunch room, complete with coke machine... empty, unfortunately. There is a door to the west.",
			brief: "Lunch room." },
		underground: true,
		visited: false
	},
	{ travel: { north: 7, ne: -1, east: -1, se: -1, south: 18, sw: -1, west: -1, nw: 6, up: -1, down: 18, implicit: 'south' }, // 5026 rm 13
		desc: { full: "What a creepy place! There are cobwebs everywhere! A door leads north, a hall goes northwest,\
				and there is a hole in the floor.",
			brief: "Cobweb room." },
		underground: true,
		visited: false
	},
	{ travel: { north: 14, ne: -1, east: 14, se: -1, south: 14, sw: 14, west: 15, nw: 8, up: -1, down: -1, implicit: 'north' }, // 5028 rm 14
		desc: { full: "You are lost in a maze!", brief: "You are lost in a maze!" },
		underground: true,
		visited: false
	},
	{ travel: { north: 14, ne: 15, east: 15, se: -1, south: 15, sw: 15, west: -1, nw: 9, up: 8, down: -1, implicit: 'ne' }, // 5030 rm 15
		desc: { full: "You are lost in a maze!", brief: "You are lost in a maze!" },
		underground: true,
		visited: false
	},
	{ travel: { north: 17, ne: 17, east: 17, se: 17, south: 17, sw: 17, west: 17, nw: 17, up: 17, down: 17, implicit: 'north' }, // 5032 rm 16
		desc: { full: "You are splashing about in a cold, rushing stream! Nothing you do seems to stop your perilous\
				ride towards a nearby stony cave entrance!",
			brief: "Rushing stream." },
		underground: true,
		visited: false
	},
	{ travel: { north: 11, ne: 18, east: -1, se: -1, south: -1, sw: -1, west: -1, nw: -1, up: -1, down: -1, implicit: 'north' }, // 5034 rm 17
		desc: { full: "You lie on the sands of a dark, slimy cavern by a stream. The walls are covered with disgusting\
				ooze. There is a hole in the northern rocks and a path northeastward.",
			brief: "Slimy cavern." },
		underground: true,
		visited: false
	},
	{ travel: { north: 13, ne: -1, east: -1, se: -1, south: -1, sw: 17, west: -1, nw: -1, up: 13, down: 19, implicit: 'down' }, // 5036 rm 18
		desc: { full: "Sweat beads on your face as you stand in a steamy cave. Smoke rises from a hole in the floor,\
				and there is another ragged hole in the roof within reach. Theres also a path going southwest.",
			brief: "Steamy cave." },
		underground: true,
		visited: false
	},
	{ travel: { north: 22, ne: 22, east: 22, se: 22, south: 22, sw: 22, west: 22, nw: 22, up: 18, down: 1, implicit: 'up' }, // 5038 rm 19
		desc: { full: "You are crouching on a fiery spire, a pinnacle surrounded by flames! A low roof with a hole\
				hangs a foot above your head. It is unbearably hot!",
			brief: "Fiery spire." },
		underground: true,
		visited: false
	},
	{ }, { },
	{ trap: "You burn in the flames!" },
	{ trap: "You fall to your doom..."}
];

var objects = [
	{ location: -1,
		desc: { full: "There is an angry orc nearby!", brief: "" },
		status: 0,
		monster: true,
		carryable: false
	},
	{ location: 3,
		desc: { full: "There is a crown of jewels here!", brief: "Jeweled crown" },
		monster: false,
		carryable: true
	},
	{ location: 6,
		desc: { full: "There is a golden cube here!", brief: "Golden cube" },
		monster: false,
		carryable: true
	},
	{ location: 19,
		desc: { full: "There is a diamond here carved like a beetle!", brief: "Diamond beetle" },
		monster: false,
		carryable: true
	},
	{ location: 10,
		desc: { full: "There is a fine silver belt here!", brief: "Silver belt" },
		monster: false,
		carryable: true
	},
	{ location: 4,
		desc: { full: "There is a ring here of pure platinum!", brief: "Platinum ring" },
		monster: false,
		carryable: true
	},
	{ location: 18,
		desc: { full: "There is a polished onyx here!", brief: "Onyx" },
		monster: false,
		carryable: true
	},
	{ location: 6,
		desc: { full: "There is a coin here worth millions!", brief: "Coin" },
		monster: false,
		carryable: true
	},
	{ location: 5,
		desc: { full: "There is an ancient hourglass here!", brief: "Hourglass" },
		monster: false,
		carryable: true
	},
	{ location: 1,
		desc: { full: "There is a burning torch here.", brief: "Torch" },
		monster: false,
		carryable: true
	},
	{ location: 2,
		desc: { full: "There is a hefty magic axe here.", brief: "Axe" },
		monster: false,
		carryable: true
	},
	{ location: 9,
		desc: { full: "There is a large key here.", brief: "Key" },
		monster: false,
		carryable: true
	},
	{ location: 11,
		desc: { full: "There is an enchanted grenade here.", brief: "Grenade" },
		monster: false,
		carryable: true,
		drop_handler: 'bomb'
	},
	{ location: 3,
		desc: { full: "A giant mantis crouches nearby, ready to pounce!", brief: "" },
		axe: true,
		monster: true,
		carryable: false
	},
	{ location: 17,
		desc: { full: "A huge iguana paces restlessly nearby, keeping an eye on you!", brief: "" },
		axe: true,
		monster: true,
		carryable: false
	},
	{ location: 13,
		desc: { full: "A giant white spider, mandibles twitching, towers above you!", brief: "" },
		axe: false,
		monster: true,
		carryable: false
	},
	{ location: 5,
		desc: { full: "The nameless terror arises from a pit, block your retreat with slimy tentacles!!", brief: "" },
		axe: false,
		monster: true,
		carryable: false
	},
	{ monster: false,
		carryable: false
	}
];

// to do: the obstacle type does double duty as the message number.
var obstacles = [
	{ passable: false, connectedObstacle: 2, type: 2, direction: 'down', location: 1 },
	{ passable: false, connectedObstacle: 0, type: 2, direction: 'up', location: 7 },
	{ passable: false, connectedObstacle: 2, type: 3, direction: 'se', location: 5 },
	{ passable: false, connectedObstacle: 0, type: 3, direction: 'nw', location: 11 },
	{ passable: false, connectedObstacle: 2, type: 3, direction: 'south', location: 3 },
	{ passable: false, connectedObstacle: 0, type: 3, direction: 'north', location: 10 },
	{ passable: false, connectedObstacle: 1, type: 1, direction: 'ne', location: 3 },
	{ passable: false, connectedObstacle: 1, type: 1, direction: 'ne', location: 17 },
	{ passable: false, connectedObstacle: 1, type: 1, direction: 'nw', location: 13 },
	{ passable: false, connectedObstacle: 1, type: 1, direction: 'se', location: 5 } ];

var player = {
	location: 0, // set player to start in room 0.
	steps: 0,
	itemsHeld: 0,
	deaths: 0,
	orcKills: 0,
	orcAppearanceCountdown: rnd(10) + 10 // set the orc appearance counter initial value
};

start();

function start() {
	var visited = rooms[player.location].visited; // get the room status info
	viewrm(player.location, visited); // view room
	if ((!darkck(player.location)) && (!visited)) { // the room is not dark and hasn't been visited, so set it to visited
		rooms[player.location].visited = true;
	} else if(darkck(player.location)) { // if the room is dark, randomly determine if the player falls in a pit.
		var n = rnd(100);
		console.log(n);
		if(n < 20) {
			mesprt(4);
			resurrect();
			return;
		}
	}
	list_objects(player.location);
	orc_encounter();
}

function processCommand(command) {
	var pieces = get_command(command);
	console.log(pieces);
	var command = idword(pieces[0]);
	console.log(command);
	doCommand(command, pieces);
}

// handlers
var handlers = {
	move: function(command, pieces) {
		console.log('direction - ' + command.direction);
		var k=0;
		for(k=0; k < obstacles.length; k++) {
			var obstacle = obstacles[k];
			if ((command.direction == obstacle.direction) && (player.location == obstacle.location)) {
				console.log('obstacle encountered');
				if (!obstacle.passable) {
					mesprt(obstacle.type); // to do: the obstacle type does double duty as the message number.
					orc_encounter();
					return;
				}
			}
		}
		var destination = rooms[player.location].travel[command.direction];
		if (destination < 0) {
			mesprt(5);
			orc_encounter();
		} else if('trap' in rooms[destination]) {
			print(rooms[destination].trap);
			resurrect();
		} else {
			player.location = destination;
			player.steps = player.steps+1;
			start();
		}
	},

	implicit_move: function(command, pieces) {
		if(pieces[1] == '') { // implicit direction
			var newCommand = words[rooms[player.location].travel.implicit];
			console.log(newCommand);
			doCommand(newCommand, pieces);
			return;
		} else {
			console.log('reprocess');
			processCommand(pieces[1]);
			return;
		}
	},

	take: function(command, pieces) {
		if(player.itemsHeld>=5) {
			mesprt(35); // carrying too much
			orc_encounter();
			return;
		}
		var word = idword(pieces[1]);
		console.log(word);
		if(('failure' in word) || (word.verb)) {
			mesprt(6);
			orc_encounter();
			return;
		}

		var obj = word.object;
		if ((objects[obj].location != 21) && (objects[obj].location != player.location)) {
			mesprt(11); // not here or not takeable
		} else if (objects[obj].location == 21) {
			mesprt(8); // already in inventory
		} else {
			if (objects[obj].monster) {
				mesprt(39); // can't take a monster.
			} else {
				if (!objects[obj].carryable) {
					mesprt(7); // immovable
				} else {
					console.log('take');
					objects[obj].location = 21;
					mesprt(10);
					player.itemsHeld = player.itemsHeld + 1;
				}
			}
		}
		orc_encounter();
	},

	drop: function(command, pieces) {
		var word = idword(pieces[1]);
		if(word.verb) {
			mesprt(6);
		} else {
			if (objects[word.object].location != 21) {
				mesprt(9);
			} else {
				if ('drop_handler' in objects[word.object]) {
					handlers[objects[word.object].drop_handler](command, pieces);
					return;
				} else {
					objects[word.object].location = player.location;
					mesprt(10);
					player.itemsHeld = player.itemsHeld - 1;
				}
			}
		}
		orc_encounter();
	},

	open: function(command, pieces) {
		if(pieces[1] == '') { // did not specify what to open
			mesprt(6);
		} else {
			var word = idword(pieces[1]);
			console.log(word);
			var a = check_for_obstacle(player.location, word.extra);
			if(a==-1) { // no obstacle
				mesprt(11);
			} else {
				if(obstacles[a].passable) { // it's already passable, no need to do that.
					mesprt(12);
				} else {
					if(objects[11].location != 21) { // is the key in the inventory
						mesprt(15);
					} else { // we have the key, open the door.
						reverse_obstacle(a);
						mesprt(11+obstacles[a].type);
					}
				}
			}
		}
		orc_encounter();
	},

	close: function(command, pieces) {
		if(pieces[1] == '') {
			mesprt(6);
		} else {
			var word = idword(pieces[1]);
			var a = check_for_obstacle(player.location, word.extra);
			if(a==-1) {
				mesprt(11);
			} else {
				if(!obstacles[a].passable) {
					mesprt(12);
				} else {
					reverse_obstacle(a);
					mesprt(16);
				}
			}
		}
		orc_encounter();
	},

	fight: function(command, pieces) {
		if (objects[0].status == 1) { // the orc is active
			rest_of_fight({ axe: true });
			return;
		} else {
			var k = 13;
			for(k = 13; k <= 16; k++) {
				if (objects[k].location == player.location) {
					rest_of_fight(objects[k]);
					return;
				}
			}
			// no obstacles found
			mesprt(40);
			orc_encounter();
			return;
		}
	},

	inventory: function() {
		mesprt(17);
		var j=0;
		for(j=0; j < objects.length; j++) {
			if(objects[j].location == 21) {
				print(objects[j].desc.brief);
			}
		}
		orc_encounter();
	},

	quip_at_player: function(command, pieces) {
		mesprt(command.message);
		orc_encounter();
	},

	look: function() {
		viewrm(player.location, false);
		list_objects(player.location);
		orc_encounter();
	},

	read: function() {
		if(player.location != 6) {
			mesprt(31);
		} else {
			mesprt(32);
		}
		orc_encounter();
	},

	score: function() {
		points();
		orc_encounter();
	},

	say: function(command, pieces) {
		if(pieces[1].substr(0,5) != 'aardv') {
			mesprt(33);
			orc_encounter();
		} else {
			aardvark();
		}
	},

	quit: function() {
		mesprt(30);
		points();
		// end
	},

	save: function() {
		/* the original game assumes you're using a cassette tape recorder.
		Clearly, this is not going to happen in a JS port in a browser. However,
		because it's fun, let's just implement this as a JSON object dumped
		into the browser's localStorage api. */
		mesprt(18);
		var gameObj = { objects: objects, rooms: rooms, obstacles: obstacles, player: player };
		console.log(JSON.stringify(gameObj));
		localStorage.setItem('basements-and-beasties.savegame', JSON.stringify(gameObj));
		orc_encounter();
	},

	restore: function() {
		mesprt(18);
		var gameObj = JSON.parse(localStorage.getItem('basements-and-beasties.savegame'));
		console.log(gameObj);
		objects = gameObj.objects;
		rooms = gameObj.rooms;
		obstacles = gameObj.obstacles;
		player = gameObj.player;
		orc_encounter();
	},

	bomb: function() {
		if (objects[12].location != 21) {
			mesprt(19);
		} else {
			objects[12].location = player.location;
			player.itemsHeld = player.itemsHeld - 1;
			var k = 15;
			for(k = 15; k <= 16; k++) {
				if (objects[k].location == player.location) { // a bombable obstacle is defeated by the player.
					objects[k].location = -1;
					reverse_obstacle(check_for_obstacle(player.location, 1));
					mesprt(21);
					break;
				}
			}
			if(k==17) { mesprt(20); }
		}
		orc_encounter();
	},

	aardvark: function() {
		if(player.location == 5) {
			player.location = 0;
		} else {
			if (player.location == 0) {
				player.location = 5;
			} else {
				mesprt(33);
			}
		}
		start();
	}

};

function doCommand(command, pieces) {
	if ('failure' in command) {
		mesprt(6);
		orc_encounter();
		return;
	}

	console.log('handler to exec - ' + command.handler);
	handlers[command.handler](command, pieces);
}

function orc_encounter() {
	console.log('Step counter - ' + player.orcAppearanceCountdown);
	console.log(objects[0]);
	if((objects[0].status == 0) && (rooms[player.location].underground)) {
		player.orcAppearanceCountdown = player.orcAppearanceCountdown - 1; // decrement the step counter
	}
	if (player.orcAppearanceCountdown <= 0) { // the orc is encountered
		console.log('the orc is encountered.');
		player.orcAppearanceCountdown = rnd(10) + 10; // reset the step counter
		objects[0].location = player.location; // move the orc to the adventurer
		objects[0].status = 1; // the orc is the on the chase
	}

	if ((objects[0].status == 1) && (!rooms[player.location].underground)) { // the adventurer is above ground
		console.log('orc does not follow player above ground.');
		objects[0].status = 0; // the orc is not on the chase
		objects[0].location = -1;
		return;
	}
	if(objects[0].status != 1) { return; }

	console.log('chase the player.');
	objects[0].location = player.location; // keep moving the orc after the player.

	print(objects[0].desc.full);
	var b = rnd(100);
	if(b > 75) {
		console.log('the orc does not attack.');
		return;
	}
	mesprt(41);
	b = rnd(100);
	if(b > 60) {
		mesprt(42);
		resurrect();
		return;
	} else {
		return;
	}
}

// subroutines
function resurrect() {
	player.deaths = player.deaths + 1;
	mesprt(34);
	objects[9].location = 1;
	var i = 0;
	for(i = 0; i < objects.length; i++) {
		if (objects[i].location == 21) {
			objects[i].location = player.location;
		}
	}
	player.location = 0;
	player.itemsHeld = 0;
	start();
}

function rest_of_fight(object) {
	if(objects[10].location != 21) { // do we have the axe?
		mesprt(22);
		return;
	} else { // we have the axe
		if (!object.axe) { // too bad we can't defeat it with the axe.
			mesprt(23);
			retaliation();
			return;
		} else { // swing away
			var x = rnd(100);
			if (objects[0].status == 1) {
				if (x > 70) { // we miss the orc
					mesprt(25);
					orc_encounter();
					return;
				} else { // we defeated the orc
					objects[0].status = 0;
					objects[0].location = -1;
					player.orcKills = player.orcKills +25;
					mesprt(24);
					return;
				}
			} else if (x > 70) { // we miss the monster
				mesprt(25);
				retaliation();
				return;
			} else { // we defeated the monster
				object.location = -1;
				reverse_obstacle(check_for_obstacle(player.location, 1));
				mesprt(24);
				return;
			}
		}
	}
}

function retaliation() {
	mesprt(26);
	var x = rnd(100);
	if(x < 30) { // the monster wins
		mesprt(28);
		resurrect();
		return;
	} else { // the monster misses
		mesprt(27);
		return;
	}
}

function get_command(input) {
	var pieces = [ input, ''];
	var i = 0;
	for(i=0; i < input.length; i++) {
		if(input.substr(i, 1) == ' ') {
			pieces[0] = input.substr(0, i);
			pieces[1] = input.substr(i + 1, input.length - i);
			return pieces;
		}
	}
	return pieces;
}

function idword(word) {
	if(word.length > 5) {
		word = word.substr(0, 5);
	}
	var key = '';
	for(key in words) {
		if(key == word) {
			return words[key];
		}
	}
	return { failure: true };
}

function mesprt(b) {
	print(messages[b - 1]);
}

function list_objects(location) {
	if(darkck(location)) {
		return;
	} else {
		var b=0;
		for(b=0; b < objects.length; b++) {
			if(location == objects[b].location) {
				print(objects[b].desc.full);
			}
		}
	}
}

function viewrm(location, visited) {
	if(darkck(location)) {
		mesprt(38);
	} else {
		print(rooms[location].desc[visited ? 'brief' : 'full']);
	}
}

function darkck(location) {
	if((objects[9].location != 21) && (rooms[location].underground)) {
		return true; // too dark to see.
	} else {
		return false;
	}
}

function check_for_obstacle(location, type) {
	var q = 0;
	for(q=0; q < obstacles.length; q++) {
		var obstacle = obstacles[q];
		if((obstacle.location == location) && (obstacle.type == type)) {
			console.log(q);
			return q;
		}
	}
	return -1;
}

function reverse_obstacle(obsNum) {
	if(obsNum == -1) { return; }
	var obstacle = obstacles[obsNum];
	obstacle.passable = !(obstacle.passable);
	if(obstacle.connectedObstacle == 1) {
		return;
	} else {
		obstacles[obsNum - 1 + obstacle.connectedObstacle].passable = !(obstacles[obsNum - 1 + obstacle.connectedObstacle].passable);
		return;
	}
}

function points() {
	mesprt(29);
	var sum = player.orcKills; // orc points
	var i=0;
	for(i=0; i < rooms.length; i++) {
		if(rooms[i].visited) {
			sum++;
		}
	}
	for(i=1; i <= 8; i++) {
		if(objects[i].location == 0) {
			sum = sum + 10; // treasures returned to home.
		}
	}
	for(i=13; i <= 16; i++) {
		if(objects[i].location == -1) {
			sum = sum + 20; // obstacles defeated.
		}
	}
	sum = sum - (player.deaths * 20); // penalty for resurrections.
	print(sum);
	print(player.steps);
	print("steps");
}

console.log("Source code loaded");
});

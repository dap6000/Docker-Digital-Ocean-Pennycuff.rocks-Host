console.log('start');
$(document).ready(function() {
	'use strict';

	function rnd(n) { return Math.floor(Math.random() * (n - 1)) + 1; }

	function print(str) {
		$('#game').append(str);
		$('#game').append('<br>');
		window.scrollTo(0,document.body.scrollHeight);
	}

	function capture_cursor() {
		$('input#command').focus();
	}
	capture_cursor();
	$('body').click(capture_cursor);

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
		'orc': { verb: false, extra: 0, object: 0 }, // can delete?
		'jewel': { verb: false, extra: 0, object: 1 }, // can delete?
		'crown': { verb: false, extra: 0, object: 1 }, // can delete?
		'golde': { verb: false, extra: 0, object: 2 }, // can delete?
		'cube': { verb: false, extra: 0, object: 2 }, // can delete?
		'diamo': { verb: false, extra: 0, object: 3 }, // can delete?
		'beetl': { verb: false, extra: 0, object: 3 }, // can delete?
		'silve': { verb: false, extra: 0, object: 4 }, // can delete?
		'belt': { verb: false, extra: 0, object: 4 }, // can delete?
		'plati': { verb: false, extra: 0, object: 5 }, // can delete?
		'ring': { verb: false, extra: 0, object: 5 }, // can delete?
		'onyx': { verb: false, extra: 0, object: 6 }, // can delete?
		'coin': { verb: false, extra: 0, object: 7 }, // can delete?
		'hourg': { verb: false, extra: 0, object: 8 }, // can delete?
		'torch': { verb: false, extra: 0, object: 9 }, // can delete?
		'axe': { verb: false, extra: 0, object: 10 }, // can delete?
		'key': { verb: false, extra: 0, object: 8 },
		'grena': { verb: false, extra: 0, object: 12 }, // can delete?
		'manti': { verb: false, extra: 0, object: 13 }, // can delete?
		'iguan': { verb: false, extra: 0, object: 14 }, // can delete?
		'spide': { verb: false, extra: 0, object: 15 }, // can delete?
		'namel': { verb: false, extra: 0, object: 16 }, // can delete?
		'terro': { verb: false, extra: 0, object: 16 }, // can delete?
		'ooze': { verb: false, extra: 0, object: 17 }, // can delete?
		'desks': { verb: false, extra: 0, object: 17 }, // can delete?
		'cabin': { verb: false, extra: 0, object: 17 }, // can delete?
		'bodie': { verb: false, extra: 0, object: 17 }, // can delete?
		'coke': { verb: false, extra: 0, object: 17 },
		'machi': { verb: false, extra: 0, object: 17 }, // can delete?
		'cobwe': { verb: false, extra: 0, object: 17 }, // can delete?
		'cases': { verb: false, extra: 0, object: 17 }, // can delete?
		'coffi': { verb: false, extra: 0, object: 17 }, // can delete?
		'door': { verb: false, extra: 3, object: 9 },
		'grate': { verb: false, extra: 2, object: 17 }, // can delete?
		'dolla': { verb: false, extra: 0, object: 2 },
		'soda': { verb: false, extra: 0, object: 4 },
		'apple': { verb: false, extra: 0, object: 6 },

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
		'kill': { verb: true, handler: 'fight' }, // can delete?
		'fight': { verb: true, handler: 'fight' }, // can delete?
		'slay': { verb: true, handler: 'fight' }, // can delete?
		'blow': { verb: true, handler: 'bomb' }, // can delete?
		'bomb': { verb: true, handler: 'bomb' }, // can delete?
		'wait': { verb: true, message: 37, handler: 'quip_at_player' }, // can delete?
		'help': { verb: true, message: 36, handler: 'quip_at_player' }, // change?
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
		'steal': { verb: true, handler: 'take' }, 
		'in': { verb: true, handler: 'implicit_move' },
		'out': { verb: true, handler: 'implicit_move' },
		'go': { verb: true, handler: 'implicit_move' },
		'enter': { verb: true, handler: 'implicit_move' },
		'exit': { verb: true, handler: 'implicit_move' },
		'save': { verb: true, handler: 'save' },
		'resto': { verb: true, handler: 'restore' }, // can delete?
		'aardv': { verb: true, handler: 'aardvark' }, // can delete?
		'fix': { verb: true, handler: 'fix' }, 
		'buy': { verb: true, handler: 'buy' },
		'use': { verb: true, handler: 'buy' },
		'give': { verb: true, handler: 'give' },
		'throw': { verb: true, handler: 'throw' },
		'chuck': { verb: true, handler: 'throw' },
	};

	// 7000 - 7999	Message block
	var messages = [
		// mesprt(x) prints messages[x - 1] so we will number these from 1 
		// 1
		"You give the man the soda, he drinks it and gives you an apple in return",  // mention lunch here?
		// 2
		"The principal's door is tightly shut and locked!",
		// 3
		"The front door is tightly shut and locked!", // 7002
		// 4
		"The man takes his laptop, says thank you, and leaves. He leaves a dollar out for you", // 7004
		// 5
		"You can't go that way.", // 7005
		// 6
		"What did you say?", // 7006
		// 7
		"You try unsuccessfully... immovable!", // 7007
		// 8
		"You already have it!", // 7008
		// 9
		"You don't have it!", // 7009
		// 10
		"Okay.", // 7010
		// 11
		"I see nothing of the sort here.", // 7011
		// 12
		"You don't need to.", // 7012
		// 13
		"You put the dollar in the machine. It leaves a soda for you.", // 7013
		// 14
		"The door swings open wide.", // 7014
		// 15
		"You have no key!", // 7015
		// 16
		"It slams shut and the lock catches.", // 7016
		// 17
		"You have the following:", // 7017
		// 18
		"Prepare tape recorder and hit &lt;enter>.", // 7018
		// 19
		"You have no money!", // 7019
		// 20
		"You dont have a drink!", // 7020
		// 21
		"The grenade explodes in a slient flash of weird blue light... and the creature is gone!", // 7021
		// 22
		"You have no apple!", // 7022
		// 23
		"Everyone gets into a food fight. The principal comes out and tries to calm down the crowd.", // leaves door open
		// 24
		"Good job you made it out. Now you are homeless and alone, nice.", // 7024
		// 25
		"Missed it! Fie!", // 7025
		// 26
		"The hideous monster leaps at your throat!", // 7026
		// 27
		"Somehow you fend it off!", // 7027
		// 28
		"It finishes you off!!", // 7028
		// 29
		"Your score is:", // 7029
		// 30
		"Do visit the basement again!", // 7030
		// 31
		"Nothing here to read... how dull!", // 7031
		// 32
		"The danger here / is pretty thick, / but say <Aardvark>; / You'll get out quick!", // 7032
		// 33
		"Nothing happens.", // 7033
		// 34
		"Well, fine adventurer! You are in a real jam! Fortunately, we can bring you back! ...POOF!!...", // 7034
		// 35
		"Your arms are full... you can carry no more.", // 7035
		// 36
		"Your cries go unheard, pitiful wretch.", // 7036
		// 37
		"Time passes...", // 7037
		// 38
		"It is pitch dark! You may fall into a pit!", // 7038
		// 39
		"You manifest some pretty suicidal tendencies, fella!", // 7039
		// 40
		"Save your stamina, turkey! I see no real threat!", // 7040
		// 41
		"He swings at you with a black scimitar!", // 7042
		// 42
		"You are slashed in pieces." // 7043
	];

	var rooms = [
		// room 0
		{ travel: { north: 7, ne: 0, east: 6, se: 0, south: 1, sw: 0, west: 0, nw: 0, up: -1, down: -1, implicit: 'south' }, // 5000 rm 0
			desc: { full: "You can escape frome the front doors but it's locked, you need to find a key.",
				brief: "Front doors." },
			underground: false,
			visited: false
		},
		// room 1
		{ travel: { north: 0, ne: 1, east: 2, se: 1, south: 1, sw: 1, west: 1, nw: 1, up: -1, down: -1, implicit: 'east' }, // 5002 rm 1
			desc: { full: "This cafeteria is HUGE! Maby it could provide a distraction later",
				brief: "Cafeteria room." },
			underground: false,
			visited: false
		},
		// room 2
		{ travel: { north: 2, ne: 2, east: 3, se: 2, south: 2, sw: 2, west: 1, nw: 2, up: -1, down: -1, implicit: 'east' }, // 5004 rm 2
			desc: { full: "There is some stairs to the west and a soda machine.",
				brief: "Stairs." },
			underground: true,
			visited: false
		},
		// room 3
		{ travel: { north: 4, ne: 3, east: 3, se: 3, south: 5, sw: 3, west: 2, nw: 3, up: -1, down: -1, implicit: 'north' }, // 5006 rm 3
			desc: { full: "The hall room is kinda dark but you can tell there's one room north and one south.",
				brief: "Hallway." },
			underground: true,
			visited: false
		},
		// room 4
		{ travel: { north: 4, ne: 4, east: 4, se: 4, south: 3, sw: 4, west: 4, nw: 4, up: -1, down: -1, implicit: 'south' }, // 5008 rm 4
			desc: { full: "Your in the math room.",
				brief: "Math room."},
			underground: true,
			visited: false
		},
		// room 5
		{ travel: { north: 3, ne: 5, east: 5, se: 5, south: 5, sw: 5, west: 5, nw: 5, up: -1, down: -1, implicit: 'north' }, // 5010 rm 5
			desc: { full: "You recognize this place as the art room.",
				brief: "Art room." },
			underground: true,
			visited: false
		},
		// room 6
		{ travel: { north: 6, ne: 6, east: 6, se: 6, south: 6, sw: 6, west: 0, nw: 6, up: -1, down: -1, implicit: 'west' }, // 5012 rm 6
			desc: { full: "It's the worst place in school, The Principal's office.",
				brief: "Principal's office." },
			underground: true,
			visited: false
		},
		// outside / win room 7
		{ travel: { north: 7, ne: 7, east: 7, se: 7, south: 0, sw: 7, west: 7, nw: 7, up: -1, down: -1, implicit: 'up'},
			desc: { full: " YOU WIN! "},
			underground: false,
			visited: false
		},
		// player inventory room 21
		{}
	];

	var objects = [
		
		
		// 0 soda machine
		{ 	location: 2,
			desc: { full: "There is a soda machine here.", brief: ""},
			carryable: false
		},
		// 1 broken computer
		{	location: 4,
			desc: { full: "There is a broken computer.", brief: ""},
			carryable: false
		},
			
		// 2 dollar
		{	location: -1,
			desc: { full: "There is one dollar on the table.", brief: "dollar"},
			carryable: true
		},
		// 3 computer man 
		{	location: 4,
			desc: { full: "A man sits frowning at his laptop.", brief: ""},
			carryable: false
		},
			  
		// 4 soda
		{	location: -1,
			desc: { full: "There is a soda.", brief: "soda"}, 
			carryable: true
		},	
		// 5 thirsty man
		{ 	location: 5,
			desc: { full: "There is a thirsty man in the corner.", brief: ""},
			carryable: false
		},	
		// 6 apple
		{	location: -1,
			desc: { full: "There is an apple. It's lunch time.", brief: "apple"}, 
			 carryable: true
		},	 
		// 7 poster
		{	location: 1,
			desc: { full: "There is a poster it says absolutely no food fights!", brief: ""}, 
			carryable: false
		},	
		// 8 key
		{	location: 6,
			desc: { full: "There is a key on the desk.", brief: "key"},
			carryable: true 
		},
		// 9 door
		{
			location: 1,
			desc: { full: "The door to the outside.", brief: ""},
			carryable: false
		},
	];

	// to do: the obstacle type does double duty as the message number.
	var obstacles = [
		// principal's office door
		{ passable: false, connectedObstacle: 2, type: 2, direction: 'east', location: 0 },
		{ passable: false, connectedObstacle: 0, type: 2, direction: 'west', location: 6 },
		// front door
		{ passable: false, connectedObstacle: 2, type: 3, direction: 'north', location: 0 },
		{ passable: false, connectedObstacle: 0, type: 3, direction: 'south', location: 7 },

	];

	var player = {
		location: 0, // set player to start in room 0.
		steps: 0,
		itemsHeld: 0,
		deaths: 0, // can delete?
		orcKills: 0, // can delete?
		orcAppearanceCountdown: rnd(10) + 10 // set the orc appearance counter initial value  // can delete?
	};

	start();

	function start() {
		var visited = rooms[player.location].visited; // get the room status info
		viewrm(player.location, visited); // view room
		rooms[player.location].visited = true;
		list_objects(player.location);
		orc_encounter();  // can delete?
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
					console.log(obstacle);
					if (!obstacle.passable) {
						mesprt(obstacle.type); // to do: the obstacle type does double duty as the message number.
						orc_encounter(); // can delete?
						return;
					}
				}
			}
			var destination = rooms[player.location].travel[command.direction];
			if (destination < 0) {
				mesprt(5);
				orc_encounter(); // can delete?
			} else if('trap' in rooms[destination]) { // can delete?
				print(rooms[destination].trap); // can delete?
				resurrect(); // can delete?
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
			var word = idword(pieces[1]);
			console.log(word);
			if(('failure' in word) || (word.verb)) {
				mesprt(6);
				orc_encounter(); // can delete?
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
			orc_encounter(); // can delete?
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
			orc_encounter(); // can delete?
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
						if(objects[8].location != 21) { // is the key in the inventory
							mesprt(15);
						} else { // we have the key, open the door.
							reverse_obstacle(a);
							mesprt(24);
						}
					}
				}
			}
			orc_encounter(); // can delete?
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
			orc_encounter(); // can delete?
		},
		// no fights in this version of the game, remove handler? 
		fight: function(command, pieces) { // can delete?
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
			orc_encounter(); // can delete?
		},

		quip_at_player: function(command, pieces) {
			mesprt(command.message);
			orc_encounter(); // can delete?
		},

		look: function() {
			viewrm(player.location, false);
			list_objects(player.location);
			orc_encounter(); // can delete?
		},

		read: function() {
			if(player.location != 6) {
				mesprt(31);
			} else {
				mesprt(32);
			}
			orc_encounter(); // can delete?
		},

		score: function() {
			points();
			orc_encounter(); // can delete?
		},

		say: function(command, pieces) {
			if(pieces[1].substr(0,5) != 'aardv') {
				mesprt(33);
				orc_encounter(); // can delete?
			} else { // can delete?
				aardvark(); // can delete?
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
			localStorage.setItem('basements-and-beasties.savegame', JSON.stringify(gameObj));  // update save game file name?
			orc_encounter();
		},

		restore: function() {
			mesprt(18);
			var gameObj = JSON.parse(localStorage.getItem('basements-and-beasties.savegame')); // update save game file name
			console.log(gameObj);
			objects = gameObj.objects;
			rooms = gameObj.rooms;
			obstacles = gameObj.obstacles;
			player = gameObj.player;
			orc_encounter();
		},
		// no bombs in this versino of the game, remove handler?
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
		// doesn't apply to this version of the game, remove?
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
		},
		// fix
		fix: function(command, pieces) {
			// check and see what it says.
			if(player.location == 4 && (pieces[1] == 'computer' || pieces[1] == 'laptop')) { 
				// If it does say fix computer and they are in room 4 
				//spawn money
				objects[2].location = 4;
				// remove broken computer from room
				objects[1].location = -1;
				// remove man from room
				objects[3].location = -1;
				// tell the player what is happening
				mesprt(4);			
			} else {
				// if its not fix computer, say what did you say.
				mesprt(6);
			}
		},
		// buy 
		buy: function(command, pieces) {
			// check and see what it says.
			if(player.location == 2 && pieces[1] == 'soda' ) { 
				// If it does say buy soda and they are in room 2
				// do they have money?
				if (objects[2].location == 21) {
					// have money
					objects[2].location = -1;
					// spawn soda.
					objects[4].location = 2;
					// tell the player what is happening
					mesprt(13);
				} else {
					// no money
					mesprt(19);
				}	
			} else {
				// if its not buy soda, say what did you say.
				mesprt(6);
			}
		},
		// give
		give: function(command, pieces) {
		    // check and see what it says.
		   if(player.location == 5 && pieces[1] == 'soda' ) { 
			// If it does say give soda then see if they are in room 5
			// Do they have soda.
				if (objects[4].location == 21) { 
					//have soda
					// soda goes away
					objects[4].location = -1;
					// thirsty man goes away
					objects[5].location = -1;
					//spawn apple 
				 	objects[6].location = 5;
				 	// what is happening?
				 	mesprt(1);
				} else {
					// no soda
					mesprt(20);
				}	
			} else {
				// if its not give soda, say what did you say.
				mesprt(6);
			}
		}, 
		// throw
		throw: function(command, pieces) {
		    // check and see what it says.
		     if(player.location == 1) { 
				// If it does say trow apple then see if they are in room 1
				// do they have apple 
			 	if (objects[6].location == 21) {
					// if in room 1 then get rid of apple.
			  		objects[6].location = 1;
			  		// open principal's door
			  		reverse_obstacle(0);
			  		// tell the player what is going on
			  		mesprt(23);
				} else {
					// no apple
					mesprt(22);
				}	
			} else {
				// if not in room 1 say what did you say
				mesprt(6);
			}
		},

	};

	function doCommand(command, pieces) {
		if (! command.verb || 'failure' in command) {
			mesprt(6);
			orc_encounter();
			return;
		}

		console.log('handler to exec - ' + command.handler);
		handlers[command.handler](command, pieces);
	}
	// no orc in this version of the game, remove?
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
	// no player death in this version of the game. remove function?
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
	// no fights in this version of the game. remove function?
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
	// no fights in this version of the game. remove function?
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
		var b=0;
		for(b=0; b < objects.length; b++) {
			if(location == objects[b].location) {
				print(objects[b].desc.full);
			}
		}
	}

	function viewrm(location, visited) {
		print(rooms[location].desc[visited ? 'brief' : 'full']);
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
	// do we want scoring in this game? if so we have to rewrite this. or we can remove it.
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

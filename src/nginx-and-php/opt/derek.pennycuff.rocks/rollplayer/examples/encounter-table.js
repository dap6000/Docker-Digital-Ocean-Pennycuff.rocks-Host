/*startmeta
  name: table() Demo
  title: An example of building an encounter table using RollPlayer.table()
  date: 10/02/2014
  description: This demo uses just about every element available in the entire RollPlayer library.
  version: 1.0
  authors: Derek Pennycuff
endmeta*/
/*
We're creating a wrapper object called #demo# so that the template code can access the inner workings of this particular example.
*/
var demo = function() {
  /*
  Let's try "Forest (Temperate) (Avg. CR 5) from d20pfsrd.com":http://www.d20pfsrd.com/bestiary/indexes-and-tables/encounter-tables#TOC-Forest-Temperate-Avg.-CR-5-
  */
  var d1 = RollPlayer.die(1); 
  var d4 = RollPlayer.die(4); 
  var d6 = RollPlayer.die(6); 
  var d100 = RollPlayer.die(100); 
  var p2d6 = RollPlayer.sumPool(d6, d6);
  var rows = [
    RollPlayer.row(RollPlayer.mob(d1, 'bat swarm'), 1, 6),
    RollPlayer.row(RollPlayer.mob(d1, 'yellow musk creeper'), 7, 8),
    RollPlayer.row(RollPlayer.mob(d4, 'giant spiders'), 9, 12),
    RollPlayer.row(RollPlayer.mob(d1, 'assassin vine'), 13, 16),
    RollPlayer.row(RollPlayer.mob(d1, 'giant mantis'), 17, 20),
    RollPlayer.row(RollPlayer.mob(d1, 'unicorn'), 21, 22),
    RollPlayer.row(RollPlayer.mob(d4, 'dire bats'), 23, 26),
    RollPlayer.row(RollPlayer.mob(d4, 'boars'), 27, 32),
    RollPlayer.row(RollPlayer.mob(d1, 'dire boar'), 33, 34),
    RollPlayer.row(RollPlayer.mob(d1, 'giant stag beetle'), 35, 38),
    RollPlayer.row(RollPlayer.mob(d1, 'owlbear'), 39, 42),
    RollPlayer.row(RollPlayer.mob(d1, 'tiger'), 43, 46),
    RollPlayer.row(RollPlayer.mob(d6, 'werewolves'), 47, 52),
    RollPlayer.row(RollPlayer.mob(d4, 'dire wolves'), 53, 56),
    RollPlayer.row(RollPlayer.luck(
      RollPlayer.mob(d1, 'ettercap'), 
      RollPlayer.mob(d6, 'giant spiders')
    ).set_callback(function(a) { return a.join(' and '); }), 57, 60),
    RollPlayer.row(RollPlayer.luck(
      RollPlayer.mob(p2d6, 'goblins'), 
      RollPlayer.mob(d4, 'goblin dogs')
    ).set_callback(function(a) { return a.join(' and '); }), 61, 70),
    RollPlayer.row(RollPlayer.luck(
      RollPlayer.mob(d1, 'barghest'), 
      RollPlayer.mob(p2d6, 'goblins')
    ).set_callback(function(a) { return a.join(' and '); }), 71, 74),
    RollPlayer.row(RollPlayer.mob(d6, 'centaurs'), 75, 78),
    RollPlayer.row(RollPlayer.mob(p2d6, 'wolves'), 79, 86),
    RollPlayer.row(RollPlayer.mob(d1, 'nymph'), 87, 88),
    RollPlayer.row(RollPlayer.mob(d1, 'dire tiger'), 89, 92),
    RollPlayer.row(RollPlayer.mob(d1, 'green dragon (young)'), 93, 94),
    RollPlayer.row(RollPlayer.mob(d4, 'shambling mounds'), 95, 98),
    RollPlayer.row(RollPlayer.mob(d1, 'treant'), 99, 100)
  ];
  var t = RollPlayer.table(d100, rows);
  
  /*
  Return an object so that our template code can access the star of this example as demo.rollable
  */
  return { rollable : t };
}();
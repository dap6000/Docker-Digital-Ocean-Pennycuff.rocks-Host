/*startmeta
  name: multiColumnMenu() Demo
  title: Shakespearean Insult Generator
  date: 10/02/2014
  description: Feed 3 simpleTables into a joinPool, classy hillarity ensues
  version: 1.0
  authors: Derek Pennycuff
endmeta*/
/*
We're creating a wrapper object called #demo# so that the template code can access the inner workings of this particular example.
*/
var demo = function() {
  /*
  We're using simpleTable() to create the columns for our joinPool, but technically any rollable object produced by the RollPlayer library would work.
  
  These strings were taken from an image I found on "Science Dump":http://www.sciencedump.com/content/how-create-shakespeare-insult-10-seconds
  */
  var c1 = RollPlayer.simpleTable('artless', 'bawdy', 'beslubbering', 
      'bootless', 'churlish', 'cockered', 'clouted', 'craven', 
      'currish', 'dankish', 'dissembling', 'droning', 'errant', 
      'fawning', 'fobbing', 'froward', 'frothy', 'gleeking', 
      'goatish', 'gorbellied', 'impertinent', 'infectious', 
      'jarring', 'loggerheaded', 'lumpish', 'mammering', 
      'mangled', 'mewling', 'paunchy', 'pribbling', 'puking', 
      'puny', 'qualling', 'rank', 'reeky', 'roguish', 'ruttish', 
      'saucy', 'spleeny', 'spongy', 'surly', 'tottering', 
      'unmuzzled', 'vain', 'venomed', 'villainous', 'warped', 
      'wayward', 'weedy', 'yeasty');
  var c2 = RollPlayer.simpleTable('base-court', 'bat-fowling', 
      'beef-witted', 'beetle-headed', 'boil-brained', 
      'clapper-clawed', 'clay-brained', 'common-kissing', 
      'crook-pated', 'dismal-dreaming', 'dizzy-eyed', 
      'doghearted', 'dread-bolted', 'earth-vexing', 
      'elf-skinned', 'fat-kidneyed', 'fen-sucking', 
      'flap-mouthed', 'fly-bitten', 'folly-fallen', 'fool-born', 
      'full-gorged', 'guts-griping', 'half-faced', 
      'hasty-witted', 'hedge-born', 'hell-hated', 'idle-headed', 
      'ill-breeding', 'ill-nurtured', 'knotty-pated', 
      'milk-livered', 'motley-minded', 'onion-eyed', 
      'plume-plucked', 'pottle-deep', 'pox-marked', 
      'reeling-ripe', 'rough-hewn', 'rude-growing', 'rump-fed', 
      'shard-borne', 'sheep-biting', 'spur-galled', 
      'swag-bellied', 'tardy-gaited', 'tickle-brained', 
      'toad-spotted', 'unchin-snouted', 'weather-bitten');
  var c3 = RollPlayer.simpleTable('apple-john', 'baggage', 'barnacle', 
      'bladder', 'boar-pig', 'bugbear', 'bum-bailey', 
      'canker-blossom', 'clack-dish', 'clotpole', 'coxcomb', 
      'codpiece', 'death-token', 'dewberry', 'flap-dragon', 
      'flax-wench', 'flirt-gill', 'foot-licker', 'fustilarian', 
      'giglet', 'gudgeon', 'haggard', 'harpy', 'hedge-pig', 
      'horn-beast', 'hugger-mugger', 'joithead', 'lewdster', 
      'lout', 'maggot-pie', 'malt-worm', 'mammet', 'measle', 
      'minnow', 'miscreant', 'moldwarp', 'mumble-news', 
      'nut-hook', 'pigeon-egg', 'pignut', 'puttock', 'pumpion', 
      'ratsbane', 'scut', 'skainsmate', 'strumpet', 'varlot', 
      'vassal', 'whey-face', 'wagtail');
  /*
  The first word is supposed to always be "Thou" so we need a rollable object that alwasy returns that string. A little weird, but hey, it works.
  */
  var thou = RollPlayer.simpleTable('Thou');
  /*
  We can feed as many rollable objects into a joinPool as we want. We can mix types as well. If we have a use case for a joinPool built with a #table()#, an #explodingDie()# and another #joinPool()# we could pull that off.

  joinPool defaults to giving us a comma separated list. But we can set whatever searator we want. In this case we just want spaces. We can chain the set_separator() call or split it across multiple lines.
  */
  var bard = RollPlayer.joinPool(thou, c1, c2, c3).set_separator(' ');
  /*
  
  Return an object so that our template code can access the star of this example as demo.rollable
  */
  return { rollable : bard };
}();
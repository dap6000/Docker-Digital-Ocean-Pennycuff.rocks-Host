/*startmeta
  name: maxPool Demo
  title: A demonstration of RolePlayer.maxPool()
  date: 10/09/2014
  description: A maxPool returns the single largest result from within the pool.
  version: 1.0
  authors: Derek Pennycuff
endmeta*/
/*
We're creating a wrapper object called #demo# so that the template code can access the inner workings of this particular example.
*/
var demo = function() {
  /*
  We can build a Savage Worlds style roll using a custom callback function an a maxPool() of exploding dice. 
  */
  var trait_die = RollPlayer.explodingDie(8);
  var wild_die = RollPlayer.explodingDie();
  /*
  We want to return the larger number from the 2 dice. maxPool() does the trick.
  */
  var pool_wildcard = RollPlayer.maxPool(trait_die, wild_die);
  /*
  Return an object so that our template code can access the star of this example as demo.rollable
  */
  return { rollable : pool_wildcard };
}();
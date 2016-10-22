/*startmeta
  name: Pool Demo
  title: Basic dice pools in RollPlayer.js
  date: 10/02/2014
  description: A pool is useful if you wanna roll a fist full of dice (or other rollables) and want all the individual results back as an array.
  version: 1.0
  authors: Derek Pennycuff
endmeta*/
/*
We're creating a wrapper object called #demo# so that the template code can access the inner workings of this particular example.
*/
var demo = function() {
  /*
  Let's make some rollables to populate our luck.
  */
  var d4 = RollPlayer.die(4);
  /*
  Did I mention before the die() defualts to a d6 if you don't specify any arguments? 
  */
  var d6 = RollPlayer.die();
  /*
  Any rollable object should work, including another pool.
  */
  var inner = RollPlayer.pool(d6, d6, d6);
  /*
  The result will look flattened due to the way toString works on arrays, but if you check the console you'll get a clearer picture of what the result looks like programatically.
  
  By the way, if you want to roll a bunch of dice but have the result be a single number, such as 3d6 added together, that's what sumPools are for.
  */
  var myPool = RollPlayer.pool(d4, d4, d4, d6, d6, d6, inner);
  /*
  Return an object so that our template code can access the star of this example as demo.rollable
  */
  return { rollable : myPool };
}();
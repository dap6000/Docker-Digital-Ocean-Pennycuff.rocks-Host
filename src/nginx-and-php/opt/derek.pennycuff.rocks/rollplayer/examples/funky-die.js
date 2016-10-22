/*startmeta
  name: An odd die() Demo
  title: We can make a die() to cover any range of whole numbers
  date: 10/02/2014
  description: While designed around simulating traditional polyhedral dice, the roleplayer.js library's die() will work for any number range specified.
  version: 1.0
  authors: Derek Pennycuff
endmeta*/
/*
We're creating a wrapper object called #demo# so that the template code can access the inner workings of this particular example.
*/
var demo = function() {
  /*
  As explained in the FUDGE #die()# demo, when providing 2 arguments in order to define both the upper and lower bound of the number range the arguments can be specified in either order. Here we're putting the lower number first.  
  */
  var dFunk = RollPlayer.die(8, 13);
  /*
  Return an object so that our template code can access the star of this example as demo.rollable
  */
  return { rollable : dFunk };
}();
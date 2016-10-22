/*startmeta
  name: sumPool Demo
  title: A basic sumPool example
  date: 10/09/2014
  description: A sumPool rolls multiple dice (or other rollables) and returns the sum of the individual rolls as a result.
  version: 1.0
  authors: Derek Pennycuff
endmeta*/
/*
We're creating a wrapper object called #demo# so that the template code can access the inner workings of this particular example.
*/
var demo = function() {
  /*
  We can call the functions to produce the dice inside the call to sumPool() or we could store them in variables to be fed into sumPool() later. We can use as many dice as we want. But for this demo we'll do 3d6. Remember that die() defaults to a d6 if no arguments are supplied.
  
  Roll 6 times, in order. You get what you get. No whining.
  */
  var pool_3d6 = RollPlayer.sumPool(RollPlayer.die(), RollPlayer.die(), RollPlayer.die());
  /*
  Return an object so that our template code can access the star of this example as demo.rollable
  */
  return { rollable : pool_3d6 };
}();
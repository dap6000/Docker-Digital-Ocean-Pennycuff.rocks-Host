/*startmeta
  name: FUDGE Pool Demo
  title: A FUDGE dice pool example
  date: 10/09/2014
  description: The behavior of sumPool() also works nicely for FUDGE / Fate
  version: 1.0
  authors: Derek Pennycuff
endmeta*/
/*
We're creating a wrapper object called #demo# so that the template code can access the inner workings of this particular example.
*/
var demo = function() {
  /*
  Results will range from -4 to 4 and cluster near zero.
  
  The console output will reveal more about what's going on under the hood.
  */
  var pool_FUDGE = RollPlayer.sumPool(
    RollPlayer.die(1, -1), 
    RollPlayer.die(1, -1), 
    RollPlayer.die(1, -1), 
    RollPlayer.die(1, -1)
  );
  /*
  Return an object so that our template code can access the star of this example as demo.rollable
  */
  return { rollable : pool_FUDGE };
}();
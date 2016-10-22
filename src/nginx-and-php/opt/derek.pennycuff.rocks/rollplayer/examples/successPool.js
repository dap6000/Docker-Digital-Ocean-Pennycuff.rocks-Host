/*startmeta
  name: successPool Demo
  title: A demonstration of RolePlayer.successPool()
  date: 10/09/2014
  description: A successPool returns the number of result from within the pool that meet or exceed a specified target number.
  version: 1.0
  authors: Derek Pennycuff
endmeta*/
/*
We're creating a wrapper object called #demo# so that the template code can access the inner workings of this particular example.
*/
var demo = function() {
  /*
  We can build a classic World of Darkness style roll using a successPool() of d10s and a target number of 6. 
  */
  var d10 = RollPlayer.die(10);
  var target_number = 6;
  /*
  We can use any method we want to build our successPool(), we just need to know how many d10s to place into it. Provided a list of character traits we could do it programatically. But I'll leave that as an exercise for the reader.
  */
  var perception = 4;
  var investigation = 3;
  /*
  The successPool() will roll all the dice used to create it, compare them to the target number, and return the count of results that met or exeeded the target.
  
  We can chain the call to set_target() or split it across 2 lines. 
  */
  var classic_WoD = RollPlayer.successPool(d10, d10, d10, d10, d10, d10, d10);
  classic_WoD.set_target(target_number);
  /*
  Return an object so that our template code can access the star of this example as demo.rollable
  */
  return { rollable : classic_WoD };
}();
/*startmeta
  name: d100 Demo
  title: An example of the traditional polyhedral 100-sided die using rollpalyer.js
  date: 10/02/2014
  description: You could be pedantic and model this as 2 die(10)s but why bother?
  version: 1.0
  authors: Derek Pennycuff
endmeta*/
/*
We're creating a wrapper object called #demo# so that the template code can access the inner workings of this particular example.
*/
var demo = function() {
  /*
  The simpelest possible use of the RolePlayer.js library is to simulate the traditional polyhedral dice. Here's how you create a one-hundred sided die.
  */
  var d100 = RollPlayer.die(100);
  /*
  Return an object so that our template code can access the star of this example as demo.rollable
  */
  return { rollable : d100 };
}();
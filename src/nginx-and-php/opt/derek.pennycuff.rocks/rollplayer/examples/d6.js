/*startmeta
  name: d6 Demo
  title: An example of the traditional polyhedral 6-sided die using rollpalyer.js
  date: 10/02/2014
  description: You can model so many games with just a die(6), you guys.
  version: 1.0
  authors: Derek Pennycuff
endmeta*/
/*
We're creating a wrapper object called #demo# so that the template code can access the inner workings of this particular example.
*/
var demo = function() {
  /*
  The simpelest possible use of the RolePlayer.js library is to simulate the traditional polyhedral dice. Here's how you create a six sided die.
  */
  var d6 = RollPlayer.die(6);
  /*
  Return an object so that our template code can access the star of this example as demo.rollable
  */
  return { rollable : d6 };
}();
/*startmeta
  name: d10 Demo
  title: An example of the traditional polyhedral 10-sided die using rollpalyer.js
  date: 10/02/2014
  description: Angst ridden, non-sparkly vampires want you to f#ck off and die(10)
  version: 1.0
  authors: Derek Pennycuff
endmeta*/
/*
We're creating a wrapper object called #demo# so that the template code can access the inner workings of this particular example.
*/
var demo = function() {
  /*
  The simpelest possible use of the RolePlayer.js library is to simulate the traditional polyhedral dice. Here's how you create a ten sided die.
  */
  var d10 = RollPlayer.die(10);
  /*
  Return an object so that our template code can access the star of this example as demo.rollable
  */
  return { rollable : d10 };
}();
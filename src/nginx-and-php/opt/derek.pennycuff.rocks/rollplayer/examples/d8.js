/*startmeta
  name: d8 Demo
  title: An example of the traditional polyhedral 8-sided die using rollpalyer.js
  date: 10/02/2014
  description: The lowly die(8) doesn't get much love but at least it's a real Platonic solid
  version: 1.0
  authors: Derek Pennycuff
endmeta*/
/*
We're creating a wrapper object called #demo# so that the template code can access the inner workings of this particular example.
*/
var demo = function() {
  /*
  The simpelest possible use of the RolePlayer.js library is to simulate the traditional polyhedral dice. Here's how you create an eight sided die.
  */
  var d8 = RollPlayer.die(8);
  /*
  Return an object so that our template code can access the star of this example as demo.rollable
  */
  return { rollable : d8 };
}();
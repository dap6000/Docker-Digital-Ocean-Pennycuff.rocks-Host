/*startmeta
  name: d4 Demo
  title: An example of the traditional polyhedral 4-sided die using rollpalyer.js
  date: 10/02/2014
  description: The only down side is a digital die(4) can't be used as emergency caltrops
  version: 1.0
  authors: Derek Pennycuff
endmeta*/
/*
We're creating a wrapper object called #demo# so that the template code can access the inner workings of this particular example.
*/
var demo = function() {
  /*
  The simpelest possible use of the RolePlayer.js library is to simulate the traditional polyhedral dice. Here's how you create a four sided die.
  */
  var d4 = RollPlayer.die(4);
  /*
  Return an object so that our template code can access the star of this example as demo.rollable
  */
  return { rollable : d4 };
}();
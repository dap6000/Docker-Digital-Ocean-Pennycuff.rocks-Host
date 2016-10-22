/*startmeta
  name: d12 Demo
  title: An example of the traditional polyhedral 12-sided die using rollpalyer.js
  date: 10/02/2014
  description: TODO: Come up with something witty to day about a die(12)
  version: 1.0
  authors: Derek Pennycuff
endmeta*/
/*
We're creating a wrapper object called #demo# so that the template code can access the inner workings of this particular example.
*/
var demo = function() {
  /*
  The simpelest possible use of the RolePlayer.js library is to simulate the traditional polyhedral dice. Here's how you create a twelve sided die.
  */
  var d12 = RollPlayer.die(12);
  /*
  Return an object so that our template code can access the star of this example as demo.rollable
  */
  return { rollable : d12 };
}();
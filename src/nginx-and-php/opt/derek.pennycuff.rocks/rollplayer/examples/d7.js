/*startmeta
  name: d7 Demo
  title: An example of the not-so-traditional 7-sided die using rollpalyer.js
  date: 10/02/2014
  description: Game Science makes physical die(7)s but we can do it with a lot less overhead.
  version: 1.0
  authors: Derek Pennycuff
endmeta*/
/*
We're creating a wrapper object called #demo# so that the template code can access the inner workings of this particular example.
*/
var demo = function() {
  /*
  It is just as simple to create a virtual die with any number of sides as it is the trandtional polyhedral stuff. Here's how you create a seven sided die.
  */
  var d7 = RollPlayer.die(7);
  /*
  Return an object so that our template code can access the star of this example as demo.rollable
  */
  return { rollable : d7 };
}();
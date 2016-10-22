/*startmeta
  name: d30 Demo
  title: An example of the not-so-traditional 30-sided die using rollpalyer.js
  date: 10/02/2014
  description: If your house rules dictate that the die(30) should be purple or emerald you'll have to use your imagination
  version: 1.0
  authors: Derek Pennycuff
endmeta*/
/*
We're creating a wrapper object called #demo# so that the template code can access the inner workings of this particular example.
*/
var demo = function() {
  /*
  It is just as simple to create a virtual die with any number of sides as it is the trandtional polyhedral stuff. Here's how you create a thirty sided die.
  */
  var d30 = RollPlayer.die(30);
  /*
  Return an object so that our template code can access the star of this example as demo.rollable
  */
  return { rollable : d30 };
}();
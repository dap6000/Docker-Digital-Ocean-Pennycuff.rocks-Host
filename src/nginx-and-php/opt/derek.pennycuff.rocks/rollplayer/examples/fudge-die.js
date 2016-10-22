/*startmeta
  name: FUDGE Die Demo
  title: A FUDGE die has an equal number of +, -, and blank sides.
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
  If we provide 2 arguments to #die()# the lower number is used as the bottom of the range and the higher number as the top of the range. The arguments can be provided in either order. Since the single argument version sets the top of the range and keeps the bottom fo the range at the default of 1, maybe it is more intuitive to provide the top of the range as the first argument. Or maybe it just feels right to put the lower number first. Either way will work. 
  */
  var fudge = RollPlayer.die(1, -1);
  /*
  Return an object so that our template code can access the star of this example as demo.rollable
  */
  return { rollable : fudge };
}();
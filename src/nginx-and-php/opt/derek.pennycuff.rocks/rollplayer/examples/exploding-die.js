/*startmeta
  name: Exploding Die Demo
  title: An exploding 4-sided die using rollpalyer.js
  date: 10/02/2014
  description: When an exploding die comes up with the highest possible value it rolls again and adds the results
  version: 1.0
  authors: Derek Pennycuff
endmeta*/
/*
We're creating a wrapper object called #demo# so that the template code can access the inner workings of this particular example.
*/
var demo = function() {
  /*
  We'll use a 4-sider for the sake of demonstration since it will explode easily. The arguments for #explodingDie()# work just like a standard #die()#.
  */
  var d4 = RollPlayer.explodingDie(4);
  /*
  Return an object so that our template code can access the star of this example as demo.rollable
  */
  return { rollable : d4 };
}();
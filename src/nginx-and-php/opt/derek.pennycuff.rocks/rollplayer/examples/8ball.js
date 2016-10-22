/*startmeta
  name: Magic 8 Ball Demo
  title: Magic 8 Ball Simulator with rollpalyer.js
  date: 10/02/2014
  description: Rondomly selecting a string from a list of arbitrary length is a perfect use case for simpleTable()
  version: 1.0
  authors: Derek Pennycuff
endmeta*/
/*
We're creating a wrapper object called #demo# so that the template code can access the inner workings of this particular example.
*/
var demo = function() {
  /*
  The quickest and easiest way to build a table where every entry has an equal chance of being rolled is #RolePlayer.simpleTable()#.
  
  The constructor for #simpleTable()# takes a simple list of strings as a paramter. Internally it creates a die() object with faces equal to the number of enries in this list. This Die is used to randomly select an item from the list. 
  
  If you need entries where some are more likley than others then you should use #RolePlayer.table()# instead.
  
  All replies for this demo taken from "Wikipedia":http://en.wikipedia.org/wiki/Magic_8-Ball#Possible_answers
  */
  var magic8ball = RollPlayer.simpleTable('It is certain', 
    'It is decidedly so', 'Without a doubt', 'Yes definitely', 
    'You may rely on it', 'As I see it, yes', 'Most likely', 
    'Outlook good', 'Yes', 'Signs point to yes', 
    'Reply hazy try again', 'Ask again later', 
    'Better not tell you now', 'Cannot predict now', 
    'Concentrate and ask again', 'Don\'t count on it', 
    'My reply is no', 'My sources say no', 
    'Outlook not so good', 'Very doubtful');
  /*
  Return an object so that our template code can access the star of this example as demo.rollable
  */
  return { rollable : magic8ball };
}();
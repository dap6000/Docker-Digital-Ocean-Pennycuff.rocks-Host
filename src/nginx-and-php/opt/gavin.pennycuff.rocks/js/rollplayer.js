var RollPlayer = function() {
  // provides duck typing for the single method interface used by most of the 
  // objects in the library
  var is_rollable = function(obj) {
    return (typeof obj.roll == "function");
  };
  // single argument function for parsing an int in base 10. useful for mapping
  // over arrays
  var make_int = function() {
    return parseInt(arguments[0], 10);
  };
  // negation of isNaN. useful for filtering arrays.
  var is_not_NaN = function() {
    return ! isNaN(arguments[0]);
  };
  // returns the maximum int value found among the supplied array of values
  var biggest = function(a) {
    return M.max.apply({}, a);
  };
  // returns the minimum int value found among the supplied array of values
  var smallest = function(a) {
    return M.min.apply({}, a);
  };
  // recurvely calls roll() on the argument provided until a non-rollable 
  // return value is found
  var deep_roll = function(r) {
    while (is_rollable(r)) {
      r = r.roll();
    }
    return r;
  };
  // turns arguments into an actual array
  var args_array = function(a) {
    return Array.prototype.slice.call(a, 0);
  }
  // this helps us keep some of our lines a bit shorter and provides an easy
  // way to experiment with alternatives to Math.random()
  var M = {
      floor : Math.floor,
      max : Math.max,
      min : Math.min,
      random : Math.random
  };
  // produces an object designed to mimic traditional polyhedral gaming dice.
  function die() {
    var min, max, args;
    args = args_array(arguments).map(make_int).filter(is_not_NaN);
    if (args.length === 0) {
      min = 1;
      max = 6;
    } else if (args.length == 1) {  
      min = 1;
      max = args[0];
    } else {
      min = smallest(args);
      max = biggest(args);
    }
    var roll = function() {
      var result;
      if (min < max) {
       result = M.floor(M.random() * (max - min + 1) + min);
      } else {
       result = min;
      }
      console.log('Die result: ' + result);
      return result;
    };
    var get_max = function() {
      return max;
    };
    var get_min = function() {
      return min;
    };
    var get_range = function() {
      return max - min + 1;
    };
    return {
      roll : roll, 
      get_max : get_max,
      get_min : get_min,
      get_range : get_range
    };
  }
  // exploding dice reroll and add to their own previous rolls on a max value
  function explodingDie() {
    var d = die.apply({}, arguments);
    var roll = function() {
      // r holds each roll and result keeps a running total of all rolls
      var r, result = 0;
      // if a roll comes up as an ace (highest possible value) then we reroll
      var ace = d.get_max();
      if (d.get_range() > 1) {
        do {
          if (r > 0) {
            console.log('A die exploded! Current value is: ' + r);
          }
          r = d.roll();
          result = result + r;
        } while (r == ace);
      } else {
        //exploding would cause infinate loop
        result = ace;
      }
      console.log('Exploding die result: ' + result);
      return result;
    };
    var me = {
      roll : roll, 
      get_max : d.get_max,
      get_min : d.get_min,
      get_range : d.get_range
    };
    return me;
  }
  // naming things is hard so i cheated.
  // en.wiktionary.org/wiki/Appendix:Glossary_of_collective_nouns_by_subject
  // a luck accepts any number of rollable objects as arguments. calling roll()
  // on a luck will call roll() on each member of its collection of rollable 
  // objects. nesting of rollable objects is supported. the returned 
  // non-rollable values are placed in an array. if no callback function is 
  // declared for the luck that array serves as the return value. if a callback
  // function has been declared for the luck, that array is passed to the 
  // callback as an argument and the value returned by the luck will be 
  // dictated by the callback. the combination of nesting and arbitrary 
  // callbacks make lucks extremely powerful. but also perhaps a bit unweidly.
  // 
  function luck() {
    var rollables = args_array(arguments).filter(is_rollable);
    var cb = [];
    var roll = function() {
      var result = rollables.map(deep_roll);
      if (typeof cb == "function") {
        console.log('Luck result before callback: ' + result);
        result = cb(result);
      }
      console.log('Luck result: ' + result);
      return result;
    };
    var set_callback = function(f) {
      if (typeof f == "function") {
        cb = f;
      }
      return me;
    };
    var get_size = function() {
      return rollables.length;
    };
    var me = {
      roll : roll,
      set_callback: set_callback,
      get_size : get_size
    };
    return me;
  }
  
  function pool() {
    var l = luck.apply({}, arguments);
    var roll = function() {
      var result = l.roll();
      console.log('Pool result: ' + result);
      return result;
    };
    var me = {
      roll : roll
    };
    return me;
  }
  function sumPool() {
    var l = luck.apply({}, arguments).set_callback(function(a) {
      return a.reduce(function(a, b) { return a + b; });
    });
    var roll = function() {
      var result = l.roll();
      console.log('sumPool result: ' + result);
      return result;
    };
    var me = {
      roll : roll
    };
    return me;
  }
  function maxPool() {
    var l = luck.apply({}, arguments).set_callback(biggest);
    var roll = function() {
      var result = l.roll();
      console.log('sumPool result: ' + result);
      return result;
    };
    var me = {
      roll : roll
    };
    return me;
  }
  function successPool() {
    // we need a luck and a target number
    var l, t;
    l = luck.apply({}, arguments).set_callback(function(a) {
      return a.filter(function(el) {
        return el >= t;
      });
    });
    t = 0;
    var set_target = function(n) {
      var c = make_int(n);
      if (is_not_NaN(c)) {
        t = c;
      }
      console.log('new target is ' + t);
      return me;
    };
    var roll = function() {
      var successes = l.roll().length;
      console.log('Success pool counts ' + successes + 
                  ' successes using target number ' + t);
      return successes;
    };
    var me = {
      roll : roll,
      set_target : set_target
    };
    return me;
  }
  function joinPool() {
    var l = luck.apply({}, arguments).set_callback(function(a) {
      return a.join(s);
    });
    var s = ',';
    var roll = function() {
      var result = l.roll();
      console.log('joinPool result: ' + result);
      return result;
    };
    var set_separator = function(separator) {
      if (typeof separator === "string") {
        s = separator;
      }
      return me;
    }
    var me = {
      roll : roll,
      set_separator : set_separator
    };
    return me;
  }
  /**
   * creates an object that will return a random item from the argument list
   */
  function simpleTable() {
  	var a = arguments;
  	var d = die(a.length);
  	var roll = function() {
  	  var result = a[d.roll() - 1];
  	  console.log('simpleTable result: ' + result);
  	  return result;
  	};
  	var me = { roll : roll };
  	return me;
  }
  
  function table(rollable, rows) {
    // we need a die (or other rollable) and a lit of rows
    var d, r = {};
    if (is_rollable(rollable)) { d = rollable; }
    r = rows;
    var roll = function() {
      var n = d.roll();
      var tmp = r.filter(function(row) {
        return row.check(n);
      });
      var result = deep_roll(tmp[0]);
      console.log('Table result: ' + result);
      return result;
    };
    var me = { roll : roll };
    return me;
  }
  
  function mob(rollable, description) {
    // we need a die/rollable and a string/object to describe the mob's content
    var d, desc = {};
    if (is_rollable(rollable)) { d = rollable; }
    desc = description;
    var roll = function() {
      var n = d.roll();
      var r = '';
      if (typeof desc === 'string') {
        r = n + ' ' + desc;
      } else {
        r = [];
        for (i = 0; i < n; i++) {
          r.push(desc); 
        }
      }
      console.log('Mob result: ' + r);
      return r;
    };
    var me = { roll : roll };
    return me;
  }

  // low and high are ints representing roll results
  // val is rollable, obj, or string
  function row(val, low, high) {
    var args = args_array(arguments, 1).map(make_int).filter(is_not_NaN);
    var min = smallest(args);
    var max = biggest(args);
    var value = val;
    var roll = function() {
      return value;
    };
    var check = function(n) {
      return min <= n && n <= max;
    };
    var me = {
      roll : roll,
      check : check
    };
    return me;
  }
  return {
    die : die,
    explodingDie : explodingDie,
    luck : luck,
    pool : pool,
    sumPool: sumPool,
    maxPool: maxPool,
    successPool : successPool,
    joinPool : joinPool,
    simpleTable : simpleTable,
    table : table,
    mob : mob,
    row : row,
    is_rollable : is_rollable
  };
}();
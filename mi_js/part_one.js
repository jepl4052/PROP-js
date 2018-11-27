/*
* mapo8904
* jepl
* erho
*/

var myObject = {

  "create": function(prototypeList){
    let obj = Object.create(this);
    if(prototypeList != null){
      obj.prototypes = prototypeList;
    }
    return obj;
  },

  'call': function (funcName, parameters) {
    	var visited = [];
    	return this.findFunc(funcName, parameters, visited);
    },
    'findFunc': function (funcName, parameters, visited) {
		visited.push(this);
		if(this.hasOwnProperty(funcName)) {
			return this[funcName](parameters);
		}
		var result;
		this.prototypes.forEach(
			function(obj) {
				if(visited.indexOf(obj) == -1) {
					var call = obj.findFunc(funcName, parameters, visited)
					if(call != undefined && result === undefined) {
						result = call;
						return;
					}
				}
				else
					console.log("WARNING: Circular inheritance detected!");
			}
		);
		return result;
    },

}


try{
  /*
  * Test 1
  */
  // var obj0 = myObject.create(null);
  // obj0.func = function(arg) { return "func0: " + arg; };
  // var obj1 = myObject.create([obj0]);
  // var obj2 = myObject.create([]);
  // obj2.func = function(arg) { return "func2: " + arg; };
  // var obj3 = myObject.create([obj1, obj2]);
  // var result = obj3.call("func", ["hello"]) ;
  // console.log("should print 'func0: hello' ->", result);

/*
* Test 2
*/
// obj0 = myObject.create(null);
// obj0.func = function(arg) { return "func0: " + arg; };
// result = obj0.call("func", ["hello"]);
// console.log("should print 'func0: hello' ->", result);

/*
* Test 3
*/
obj0 = myObject.create(null);
obj0.func = function(arg) { return "func0: " + arg; };
obj1 = myObject.create([obj0]);
obj2 = myObject.create([]);
obj3 = myObject.create([obj2, obj1]);
result = obj3.call("func", ["hello"]);
console.log("should print 'func0: hello' ->", result);

} catch(err){
  console.log(err);
}

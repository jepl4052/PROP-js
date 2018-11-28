/*
* marcus pousette, mapo8904
* jens plate, jepl4052
* erik hörnström, erho7892
*/


var myObject = {

  "create": function(prototypeList){
    let obj = Object.create(this);
    if(prototypeList != null && !Array.isArray(prototypeList)){
      obj = null;
      console.error("Bad params");
    }
    if(prototypeList != null){
      //filter duplicate args
      prototypeList = prototypeList.filter((item, pos, self) => self.indexOf(item) == pos);
      obj.prototypeList = prototypeList;
    }
    return obj;
  },

  "call": function (funcName, parameters) {
    	var visited = [];
    	return this.depthSearch(funcName, parameters, visited);
    },

    "depthSearch": function (funcName, parameters, visited) {
  		visited.push(this);
  		if(this.hasOwnProperty(funcName)) {
  			return this[funcName](parameters);
  		}

      var result;
      this.prototypeList.forEach( obj => {
        if(visited.indexOf(obj) === -1) {
          //obj not found in visited[]
          var call = obj.depthSearch(funcName, parameters, visited)
					if(call != undefined && result === undefined) {
						result = call;
						return;
					}
        }else{
          console.log("Circular inheritance");
        }
      });
      return result;
    },

    addPrototype:function(obj){
      console.log(this);
      obj.prototypeList.forEach((proto) => {
        if(Object.is(proto, this) || Object.is(obj, this)){
          console.log("Circular");
          return;
        }else{
          if(!this.prototypeList){
            var prototypeList = [];
            this.prototypeList.push(obj);
          }else{
            this.prototypeList.push(obj);
          }
        }
      });
    },

}


try{
  /*
  * Test 1
  */
  var obj0 = myObject.create(null);
  obj0.func = function(arg) { return "func0: " + arg; };
  var obj1 = myObject.create([obj0]);
  var obj2 = myObject.create([]);
  obj2.func = function(arg) { return "func2: " + arg; };
  var obj3 = myObject.create([obj1, obj2]);
  var result = obj3.call("func", ["hello"]) ;
  console.log("should print 'func0: hello' ->", result);
  obj0.addPrototype(obj1);
  console.log(obj0);
  console.log(obj1);
  obj1.addPrototype(obj3);
  console.log(obj1);


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
// obj0 = myObject.create(null);
// obj0.func = function(arg) { return "func0: " + arg; };
// obj1 = myObject.create([obj0]);
// obj2 = myObject.create([]);
// obj3 = myObject.create([obj2, obj1]);
// result = obj3.call("func", ["hello"]);
// console.log("should print 'func0: hello' ->", result);

} catch(err){
    console.log(err);
}

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
      console.error("Prototype list must be empty, null or an array!");
    }
    if(prototypeList != null){
      //filter duplicate args and set obj prototypse
      obj.prototypeList = prototypeList.filter((item, pos, self) => self.indexOf(item) == pos);
    }
    return obj;
  },

  "call": function (funcName, parameters) {
    	return this.depthSearch(funcName, parameters);
    },

    /**
    * If the function does not exist within the obj itself,
    * a depth first seach for the function is used.
    * Example: obj.prototypeList[obj0, obj1, obj2]
    * If the obj0 (the first obj in the array) does not contain the function,
    * a recursive call to obj0.prototypeList will be made first instead of searching
    * in obj1 directly.
    */
    "depthSearch": function (funcName, parameters) {
  		if(this.hasOwnProperty(funcName)) {
  			return this[funcName](parameters);
  		}else{
        var notFound = true;
        var call;
        for(let i=0; notFound && (this.prototypeList) && i<this.prototypeList.length; i++){
          call = this.prototypeList[i].depthSearch(funcName, parameters);
          if(call != undefined){
            notFound = false;
          }
        }
        return call;
      }
    },

    "addPrototype":function(obj){
      let originalObject = this;
      let mayNotBeAdded = this.seachForSameObj(obj, originalObject);
      if(mayNotBeAdded){
        console.error("Circular");
      }else{
        if(this.prototypeList){
          this.prototypeList.push(obj);
        }else{
          this.prototypeList = [obj];
        }
      }
    },

    "seachForSameObj":function(obj, originalObject){
      var found = false;
      if(Object.is(obj, originalObject)){
        found = true;
      }else{
        // There are more protoypes in the obj
        for(let i=0; !found && (obj.prototypeList) && i < obj.prototypeList.length; i++){
          let proto = obj.prototypeList[i];
          found = proto.seachForSameObj(proto, originalObject);
        }
      }
      // no circular inheritance found.
      return found;
    },

}


try{
  //test Circular Inheritance
  var obj0 = myObject.create(null);
  obj0.func = function(arg) { return "func0: " + arg; };
  var obj1 = myObject.create([obj0]);
  var obj2 = myObject.create([]);
  obj2.func = function(arg) { return "func2: " + arg; };
  var obj3 = myObject.create([obj2, obj1]);
  var obj4 = myObject.create([obj2]);
  var obj5 = myObject.create([obj1]);

  var obj7 = myObject.create([obj4, obj5, obj0]);
  var obj8 = myObject.create([obj7]);
  var obj6 = myObject.create([obj8]);



  console.log("try obj0->obj0" + " should give error");
  obj0.addPrototype(obj0);

  console.log("try obj0->obj1"+ " should give error");
  obj0.addPrototype(obj1);

  console.log("try obj1->obj3"+ " should give error");
  obj1.addPrototype(obj3);

  console.log("try obj2->obj4");
  obj1.addPrototype(obj4);

  console.log("try obj7->obj6"+ " should give error");
  obj7.addPrototype(obj6);
  console.log(obj7);



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

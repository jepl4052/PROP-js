/**
* @author marcus pousette, mapo8904, jens plate, jepl4052, erik hörnström, erho7892
*/

createClass = function(className, superClassList) {

    return {

        className : className,
        superClassList : superClassList,

        call : function(funcName, parameters) {

            if (this.hasOwnProperty(funcName)) {
                return this[funcName](parameters);

            } else if (this.class !== undefined) {
                return this.class.call(funcName, parameters);

            } else if (this.superClassList !== undefined && this.superClassList !== null) {

                let list = this.superClassList;

                for (let i = 0; i < list.length; i++) {

                    let hit = list[i].call(funcName, parameters);
                    if (hit !== undefined) {
                        return hit;
                    }
                }
            }
        },

        new : function() {
            return {
                class: this,
                call: this.call
            };
        },

        checkCircularInheritance : function(args) {
            let thisClass = args[0];
            let sClass = args[1];
            let circular = false;

            if (thisClass === sClass
                || thisClass.superClassList !== undefined
                && thisClass.superClassList !== null
                && thisClass.superClassList.indexOf(sClass) !== -1) {
                return true;
            } else if (sClass.superClassList !== undefined && sClass.superClassList !== null) {
                let list = sClass.superClassList;

                for (let i = 0; i < list.length; i++) {

                    if (thisClass === list[i]) {
                        return true;
                    }
                    else if (list[i].hasOwnProperty('superClassList')
                        && list[i].superClassList !== undefined
                        && list[i].superClassList !== null)
                    {
                        circular = list[i].checkCircularInheritance([thisClass, list[i]]);

                        if (circular === true)
                            return true;
                    }
                }
            }
            return circular;
        },

        addSuperClass : function(arg) {

            if (!this.checkCircularInheritance([this, arg])) {
                if(this.superClassList === null || this.superClassList === undefined) {
                    this.superClassList = [];
                }
                this.superClassList.push(arg);
            } else {
                throw 'Error! Circular inheritance detected!';
            }
        }
    }
};

/**
 * Tests provided from assignment instructions
 */

/*

try {
    /* Test 1
    console.log("Test 1:");

    let class0 = createClass("Class0", null);
    class0.func = function(arg) { return "func0: " + arg; };
    let class1 = createClass("Class1", [class0]);
    let class2 = createClass("Class2", []);
    class2.test = function(arg) { return "func2: " + arg; };
    let class3 = createClass("Class3", [class1, class2]);
    let obj3 = class3.new();
    let result1 = obj3.call("test", ["test"]);
    console.log(result1);
    let result2 = obj3.call("func", ["func"]);
    console.log(result2);

    /* Test 2
    console.log("\nTest 2:");

    class0 = createClass("Class0", null);
    class0.func = function(arg) { return "func0: " + arg; };
    class1 = createClass("Class1", [class0]);
    class2 = createClass("Class2", []);
    class3 = createClass("Class3", [class2, class1]);
    obj3 = class3.new();
    result = obj3.call("func", ["hello"]);
    console.log(result);

    /* Test 3
    console.log("\nTest 3:");

    class0 = createClass("Class0", null);
    class0.func = function(arg) { return "func0: " + arg; };
    let obj0 = class0.new();
    result = obj0.call("func", ["hello"]);
    console.log(result);

    /* Class inheritance problem testing
    console.log("\nCircular class inheritance test:");

    let firstClass = createClass("FirstClass", null);
    let secondClass = createClass("secondClass", [firstClass]);
    firstClass.addSuperClass(secondClass);

} catch(err) {
    console.log(err);
}

*/
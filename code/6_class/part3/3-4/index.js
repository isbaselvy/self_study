
/**
 * class的name，返回类的名称，如果是类表达式，类有名字，则返回类的名称
 */
//  普通类：返回类的名称
class Person {
}
console.log('Person.name:', Person.name) // Person
// 类表达式，类没有名称： 返回表达式名称
const Humen = class {
}
console.log('Humen.name:', Humen.name); // Human
// 类表达式，类有名称：返回类的名称
const Humen2 = class P{
}
console.log('Humen2.name:', Humen2.name); // P


/**
 * new.target属性：
 * -只能在类和构造函数中访问，返回类本身，指向的是使用new来实例化一个类的时候，new关键字后面的那个类。
 * 【比如new Car()，那new.target指向的就是Car这个类】
 * ES6的类是ES5的语法糖，也就是ES5中模拟类的另一种写法，是提供的另一种更为方便的写法。
 * -ES5的普通构造函数（function）中也可使用new.target，若没有使用new来实例化function，则会返回undefind。
 * -校验函数：判断普通函数是否被当作构造函数调用，即是否使用了new来实例化，有两种方法：
 * 1)new.target ! == Car(函数名)
 * 2)!(this instanceof Car)【this指向调用函数所返回的对象】
 */

//  1.ES6中
// class Car {
// 	constructor() {
// 		console.log('ES6 target', new.target); // 访问到new后面的那个类或函数：Car，没有new则undefined
//         /* console的输出
//         class Car {
//             constructor() {
//                 console.log(new.target); // 访问到new后面的那个类或函数：Car，没有new则undefined
//             }
//         }
//         */
// 	}
// }
// new Car();


// 2.语法糖

// function Car() {
//     console.log('ES5 new.target:', new.target)
//     // 判断普通函数是否被当作构造函数调用方法1： new.target ! == Car(函数名)
// 	// if (new.target !== Car) {
// 	// 	throw Error('1必须使用new关键字调用Car');
// 	// }
//     // 判断函数是不是当作构造函数执行的方法2： !(this instanceof Car)
// 	if (!(this instanceof Car)) { 
// 		throw Error('2必须使用new关键字调用Car');
// 	}
// }

// new Car(); // new.target输出函数Car本身
// Car(); // new.target:undefined

// ES6中不用new调用类会报错
// class Car {
// 	constructor() {
// 		console.log(new.target);
// 	}
// }
// Car(); // Class constructor Car cannot be invoked without 'new'





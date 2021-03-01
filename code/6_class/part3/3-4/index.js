// name -返回类的名称，如果是类表达式，类有名字，则返回类的名称
// new.target -只能在类和构造函数中访问

// class Person {

// }
// const Humen = class P{

// }

// console.log(Humen.name);

// class Car {
// 	constructor() {
// 		console.log(new.target); // 访问到new后面的那个类或函数：Car，没有new则undefined
// 	}
// }

// new Car();


// 语法糖

// function Car() {
// 	// if (new.target !== Car) {
// 	// 	throw Error('必须使用new关键字调用Car');
// 	// }
// 	if (!(this instanceof Car)) { // 判断函数是不是当作构造函数执行的
// 		throw Error('必须使用new关键字调用Car');
// 	}
// }

// new Car();

// class Car {
// 	constructor() {
// 		console.log(new.target);
// 	}
// }

// Car();





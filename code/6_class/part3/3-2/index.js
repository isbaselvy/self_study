// 函数声明
// function a() {
// }

// 函数表达式
// const a = function() {
// }
/**
 * 类表达式 const 类的表达式名 = class 类名：可省{}
 * 类可有名字，但这个类无法在外部访问到
 * 若类有名字，类内部可用访问，且类 === 类的表达式名
 */

// 此处的p在外面访问不到
// const Person1 = class P {
// 	constructor() {
// 		console.log( P ===Person1) // true
// 		P.a = 1; // 不管Person1改名成什么名字，p.a = 1都生效，不用改类名
// 		console.log('我是鸽手!!咕咕咕!!', P.a);
// 	}
// }

// new Person1();
// console.log(P); // Uncaught ReferenceError: P is not defined

//自执行的类(实际开发中，几乎不会用到)
const Person1 = new class P {
	constructor() {
		// console.log( P ===Person1 ) // Cannot access 'Person1' before initialization at new P
		P.a = 1;
		console.log('我是鸽手!!咕咕咕!!');
	}
}();
console.log(Person1) // {} todo why

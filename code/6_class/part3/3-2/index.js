// 类表达式

// 函数表达式
// const a = function() {

// }
// 函数声明
// function a() {
// }

// 此处的p在外面访问不到
const Person1 = class P {
	constructor() {
		// console.log( P ===Person1) // true
		P.a = 1; // 不管Person1改名成什么名字，p.a = 1都生效，不用改类名
		console.log('我是鸽手!!咕咕咕!!');
	}
}

new Person1();

// console.log(P);

// 类表达式
// const Person1 = new class P {
// 	constructor() {
// 		P.a = 1;
// 		console.log('我是鸽手!!咕咕咕!!');
// 	}
// }();
